# RZ Profit

Myanmar-language Android stock, sales, expense and profit manager.

- App: RZ Profit
- Package: `com.rz.profit`
- Version: `1.0.0`
- Android: min SDK 23, target SDK 35
- Data: stored locally on the device using WebView local storage.

## Features

- Multiple products with separate purchase price, selling price and stock quantity.
- Sales entry with automatic stock deduction.
- Sale cancellation restores the sold quantity.
- Transport, delivery and other expenses are included in net profit.
- Dashboard totals and daily sales summary.
- Searchable and date-filtered sales history.
- CSV export to the Android Downloads folder.
- Portrait Android WebView application.

## Build APK

GitHub Actions builds a debug APK on pushes to `main`, pull requests, or manual dispatch.

After a successful workflow, download the `rz-profit-debug-apk-<commit>` artifact from the Actions run. The workflow records the source commit, run ID and SHA-256.

## Data safety

App data is stored on the device. Clearing app storage or uninstalling the app can erase the records. Export CSV backups regularly. This is a debug APK build; physical-device installation and acceptance testing must be performed separately before treating it as release-ready.
