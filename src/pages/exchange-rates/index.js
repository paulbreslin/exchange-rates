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
    rates: {}
  };

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
      const exchangeRequest = await fetch(
        `https://api.exchangeratesapi.io/${date}?base=${currency}`
      );

      if (!exchangeRequest.ok) {
        console.log('error', exchangeRequest);
        // TODO - Handle request
      }

      const exchangeResponse = await exchangeRequest.json();

      this.setState(
        {
          rates: Object.entries(exchangeResponse.rates)
        },
        () => console.log(this.state)
      );
    } catch (error) {
      // TODO - Request failed
      console.log('big error', error);
    }
  };

  render() {
    const { selectedCurrencyCode, selectedDate, rates } = this.state;
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
      </div>
    );
  }
}

export default ExchangeRates;
