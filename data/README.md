# App Optimizer Dashboard Data

This directory contains the data files for the App Optimizer Dashboard.

## Structure

The data is organized in the following structure:

```
data/
├── ios/              # iOS app data
│   └── <app_id>_<country>_<start_date>_<end_date>.json
│
└── android/          # Android app data
    └── <app_id>_<country>_<start_date>_<end_date>.json
```

## File Format

Each data file is a JSON file with the following structure:

```json
{
  "metadata": {
    "appId": "123456789",
    "platform": "ios",
    "country": "US",
    "timeframe": {
      "startDate": "2023-06-01",
      "endDate": "2023-06-30"
    }
  },
  "appInfo": { ... },
  "reviews": { ... },
  "keywords": { ... },
  "competitors": { ... },
  "downloads": { ... }
}
```

## Updating Data

Data is updated through the conversation interface with Claude. The dashboard will automatically refresh when new data is available.
