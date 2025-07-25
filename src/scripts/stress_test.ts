import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
let errorRate = new Rate('errors');

// Define test options
export const options = {
    stages: [
        { duration: '2m', target: 2000 },  // Ramp up to 2000 users over 2 minutes
        { duration: '5m', target: 2000 },  // Stay at 2000 users for 5 minutes
        { duration: '2m', target: 0 },     // Ramp down to 0 users over 2 minutes
    ],
    thresholds: {
        'http_req_duration': ['p(95)<500'], // 95% of requests should be below 500ms
        'errors': ['rate<0.01'],            // Less than 1% of requests should fail
        'http_req_failed': ['rate<0.01'],   // SLA: Error rate should be lower than 1%
        'http_reqs': ['rate>200'],          // SLA: At least 200 requests per second
    },
};

// Test execution
export default function () {
    // Define your API endpoint
    const res = http.get('https://your-api-endpoint.com/api/resource');

    // Check response
    const success = check(res, {
        'status is 200': (r) => r.status === 200,
        'transaction time < 500ms': (r) => r.timings.duration < 500,
    });

    // Track failed requests for custom error metric
    errorRate.add(!success);

    // Simulate user thinking time (adjust as necessary)
    sleep(1);
}
