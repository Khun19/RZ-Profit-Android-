# RZ Profit

Myanmar-language Android stock, sales, expense and profit manager.

- App: RZ Profit
- Package: `com.rz.profit`
- Version: `1.0.0`
- Android: min SDK 23, target SDK 35
- Data: stored locally on the device using WebView local storage.

## Features

- Multiple products with total purchase capital, total quantity, automatically calculated average unit cost, selling price and stock quantity.
- Sales entry by sold quantity and total sales revenue, with automatic cost-of-goods and profit calculation using each product's average unit cost.
- Automatic stock deduction and average-cost inventory valuation.
- Sale cancellation restores the sold quantity.
- Transport, delivery and other expenses are deducted from gross profit to calculate net profit.
- Existing saved product and sales records remain compatible; historical sale costs are retained. Legacy sales without payment metadata are not treated as new debts; their historical payment method remains unclassified.
- Dashboard totals for revenue, cost of goods, gross profit, net profit, stock valuation, low-stock products and best sellers.
- Cash and mobile-payment tracking with partial payments and customer outstanding balances.
- Standalone business-expense records and daily, weekly and monthly net-profit summaries.
- CSV ledger export includes sales, recorded payments, outstanding balances and standalone expenses.
- Searchable and date-filtered sales history.
- CSV export to the Android Downloads folder.
- Portrait Android WebView application.

## Build APK

GitHub Actions builds a debug APK on pushes to `main`, pull requests, or manual dispatch.

After a successful workflow, download the `rz-profit-debug-apk-<commit>` artifact from the Actions run. The workflow records the source commit, run ID and SHA-256.

## Data safety

App data is stored on the device. Clearing app storage or uninstalling the app can erase the records. Export CSV backups regularly. This is a debug APK build; physical-device installation and acceptance testing must be performed separately before treating it as release-ready.
