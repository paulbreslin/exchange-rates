import React, { Component } from 'react';

/*
  Whitelist of supported codes retrieved from:
  https://github.com/benmajor/ExchangeRatesAPI#5-supported-currencies
*/
import cc from './currency-codes.json';

class ExchangeRates extends Component {
  state = {
    selectedCurrencyCode: 'EUR',
    selectedDate: '2019-5-05',
    rates: {},
    showError: false
  };

  genericErrorMessage = 'Oops. Something went wrong.';

  componentDidMount() {
    this.fetchExchangeData();
  }

  onCurrencyCodeChange = ({ target: { value: selectedCurrencyCode } }) => {
    this.setState(
      {
        selectedCurrencyCode
      },
      this.fetchExchangeData
    );
  };

  onDateChange = ({ target: { value: selectedDate } }) => {
    this.setState(
      {
        selectedDate
      },
      this.fetchExchangeData
    );
  };

  fetchExchangeData = async () => {
    const { selectedDate: date, selectedCurrencyCode: currency } = this.state;
    try {
      // Reset error state
      this.setState({
        showError: false
      });

      const exchangeRequest = await fetch(
        `https://api.exchangeratesapi.io/${date}?base=${currency}`
      );

      if (!exchangeRequest.ok) {
        this.setState({
          showError: true
        });
        // Log to error reporting service
      }

      const exchangeResponse = await exchangeRequest.json();

      this.setState({
        rates: Object.entries(exchangeResponse.rates)
      });
    } catch (error) {
      this.setState({
        showError: true
      });
      // Log to error reporting service
    }
  };

  render() {
    const { selectedCurrencyCode, selectedDate, rates, showError } = this.state;
    const showRates = Boolean(rates.length);

    return (
      <div>
        Exchange rates
        <select
          onChange={this.onCurrencyCodeChange}
          value={selectedCurrencyCode}
        >
          {cc.codes.map(code => (
            <option value={code}>{code}</option>
          ))}
        </select>
        <input type="date" value={selectedDate} onChange={this.onDateChange} />
        {showRates && (
          <div>
            {rates.map(rate => (
              <div>
                {rate[0]} {rate[1]}
              </div>
            ))}
          </div>
        )}
        {showError && <p>{this.genericErrorMessage}</p>}
      </div>
    );
  }
}

export default ExchangeRates;
