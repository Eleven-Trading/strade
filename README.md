# strade
strade is a simple and open source momentum stock scanner and screener, giving you alerts when the price or volume of a stock increases.

# The project
## Motivation
Trade Ideas is a great and very powerful stock scanner. However, I thought it was a little bit too complicated for my need (day trading) and I could not find the correct settings for finding the right stocks for day trading. 

## Features
- Voice assistant for announcing stocks
- Customize the scan to your preferences (price range, volume range, etc.)
- Color code for filtering out the best stocks
- Stocks are listed in a table where you can quickly see price, volume, float, etc.

## Screenshots
<img src="https://7ak-public.s3.amazonaws.com/strade_scanner_sreenshot.png" height="300">

# Tech/framework used

## Built with
- Bootstrap 5
- VueJS

## Getting Started

### Prerequisites
#### Software and tools
- Gulp for building the project
- Financial Modeling Prep account and API access (https://financialmodelingprep.com)
- Okta developer api and user (https://okta.com)

### Installation

- Install dependencies (npm)
- Run "gulp" in terminal with the following arguments
	- FMP_API : your Fincancial Modeling Pre API credentials
	- OKTA_BASE_URL : base url to your Okta server
	- OKTA_CLIENT_ID : your Okta client ID

### Deployment
- Deploy on your localhost or server as a static website (using Nginx for example)
- This project includes a deployment file for deploying on PaaS Caprover

### How to use?
- Launch website and set parameters for your stock scanner. 

# Contribute
- As a trader and recreational developer I would love to get help improving this project. Things to work on and improve:
	- Clean and optimize code
	- Improve front end layout and develop new ideas 
    - Fine tune stock scanner and ideally include artificial intelligence
	- And more...

# License
This project is open sourced under the GNU GPL v3 licence
