import http from "k6/http";
import {check, sleep} from "k6";
import {Rate} from "k6/metrics";  // Adjusted import path

// Custom metrics
let errorRate = new Rate('errors');

export const options = {
    stages: [
        { duration: '1m', target: 50 },//500 locally & 50 in the cloud
        { duration: '10m', target: 100 },//1000 locally & 100 in the cloud
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<300', 'p(99)<500'],
        http_req_failed: ['rate<0.005'],
        errors: ['rate<0.005'],
        http_reqs: ['rate>100'],  // Fixed typo (was http_regs)
    },
};

// Test execution
export default function () {
    const _page = 1, _perPage = 100;
    const resource = `/api/users?page=${_page}&per_page=${_perPage}`;
    const url = 'https://reqres.in' + resource;

    const res = http.get(url);

    const success = check(res, {
        'status is 200': (r) => r.status === 200,
        'transaction time < 500ms': (r) => r.timings.duration < 500,
    });

    errorRate.add(!success);

    sleep(1);
}
