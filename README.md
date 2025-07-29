# 🚀 k6 Performance & Stress Testing Framework

This project is designed to automate **performance** and **stress** testing of APIs using [k6](https://k6.io/) with **TypeScript**. It provides reusable components, clean structure, and modern dev tooling for fast and scalable test execution.

---

## 📁 Project Structure

```
src/
├── config/                        # Environment/config files
├── data/                          # Input files for test data
├── reports/                       # Reports (if exporting manually)
└── scripts/
    └── reqres_API/
        ├── common/
        │   └── runner.ts          # Shared logic for API requests and checks
        ├── performance_testing.ts # Main script for performance testing
        └── stress_testing.ts      # Main script for stress testing
```

> 🧪 File `test_template.ts` is not part of the main testing logic. It’s ignored from test execution and should not be used in production runs.

---

## 📦 Install Dependencies

1. Clone the repository

```bash
git clone https://github.com/FrankSantillan/k6.git
cd k6
```

2. Install dev dependencies

```bash
npm install --save-dev typescript @types/k6
npm install --save-dev eslint prettier
npm install --save-dev csv-parser
npm install --save-dev typescript @types/k6 eslint prettier csv-parser

```

Installed via `devDependencies`:
- `typescript`
- `@types/k6`
- `eslint`
- `prettier`
- `csv-parser`

---

## 🧱 Build the Project

Compile TypeScript to JavaScript:

```bash
npm run build
```

This uses the `tsconfig.json` to output files into the `dist/` folder.

---

## ▶️ Run Tests

> Ensure you have k6 installed ([Install guide](https://k6.io/docs/getting-started/installation/)) or use Docker (see below).

### ✅ Run Performance Test

```bash
npm run performance_stress:testing
```

Or directly run the script:

```bash
k6 run src/scripts/reqres_API/performance_testing.ts
```

### 🔥 Run Stress Test

```bash
k6 run src/scripts/reqres_API/stress_testing.ts
```

---

## 🐳 Run k6 with Docker (Optional)

To avoid installing k6 locally:

```bash
docker run --rm -i grafana/k6 run - < src/scripts/reqres_API/stress_testing.ts
```

Or use the custom NPM script:

```bash
npm run docker
```

> Make sure you mount volumes and bind your script paths correctly when running in Docker (especially if using test data).

---

## 📊 OpenAPI → k6 Generator

Generate a test script from OpenAPI using Grafana’s tool:

```bash
npx @grafana/openapi-to-k6 <OPENAPI_PATH | URL> <OUTPUT_PATH> --include-sample-script
```

Push to k6 Cloud (optional):

```bash
k6 cloud run <OUTPUT_PATH>/k6-script.sample.ts
```

---

## 🧹 Linting and Formatting

To maintain code quality:

```bash
npx eslint .
npx prettier --write .
```

---

## 💡 Custom Metrics

- `errors` → Custom `Rate` metric added manually in `runner.ts` using `check()` failures.
- `http_req_duration` & `http_req_failed` → Defined in thresholds inside each test script.

---

## 📄 Scripts Overview

Inside `package.json`:

```json
{
  "scripts": {
    "build": "tsc",
    "template": "k6 run src/scripts/test_template.ts",
    "performance_stress:testing": "k6 run src/scripts/reqres_API/stress_testing.ts",
    "docker": "docker run --rm -i grafana/k6 run - stress_test.ts",
    "k6:grafana:openai": "npx @grafana/openapi-to-k6 <OPENAPI_PATH | URL> <OUTPUT_PATH> --include-sample-script",
    "k6:cloud": "k6 cloud run <OUTPUT_PATH>/k6-script.sample.ts"
  }
}
```

---

## 🔒 License

This project is private and intended only for internal QA and performance testing purposes

---
## GitHUb Actions
![Automated Tests](https://github.com/FrankSantillan/ADT-Take-Home/actions/workflows/automated-tests.yml/badge.svg?branch=dev)

---
## 🧑‍💻 Author
Frank Santillan
