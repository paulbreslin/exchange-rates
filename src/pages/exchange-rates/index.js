import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import format from 'date-fns/format';
import cc from 'currency-codes';
import 'react-datepicker/dist/react-datepicker.css';

/*
  Whitelist of supported codes retrieved from:
  https://github.com/benmajor/ExchangeRatesAPI#5-supported-currencies
*/
import currencyWhitelist from './currency-codes.json';
import styles from './styles.module.css';

class ExchangeRates extends Component {
  state = {
    selectedCurrencyCode: 'EUR',
    selectedDate: Date.now(),
    rates: {},
    showError: false,
    showLoading: false
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

  onDateChange = value => {
    this.setState(
      {
        selectedDate: value
      },
      this.fetchExchangeData
    );
  };

  fetchExchangeData = async () => {
    const { selectedDate, selectedCurrencyCode: currency } = this.state;
    const date = format(selectedDate, 'YYYY-MM-DD');
    try {
      // Reset error state
      this.setState({
        showLoading: true,
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
        showLoading: false,
        rates: Object.entries(exchangeResponse.rates)
      });
    } catch (error) {
      this.setState({
        showLoading: false,
        showError: true
      });
      // Log to error reporting service
    }
  };

  render() {
    const {
      selectedCurrencyCode,
      selectedDate,
      rates,
      showError,
      showLoading
    } = this.state;
    const showRates = Boolean(rates.length);

    return (
      <div>
        <select
          onChange={this.onCurrencyCodeChange}
          value={selectedCurrencyCode}
        >
          {currencyWhitelist.codes.map(code => (
            <option value={code}>{code}</option>
          ))}
        </select>
        <DatePicker selected={selectedDate} onChange={this.onDateChange} />
        {showLoading && <p>Loading...</p>}
        {showRates && !showError && !showLoading && (
          <table className={styles.rates}>
            <thead>
              <th>Currency</th>
              <th />
              <th>Rate</th>
            </thead>
            <tbody>
              {rates.map(rate => (
                <tr>
                  <td>{rate[0]}</td>
                  <td>{cc.code(rate[0]).currency}</td>
                  <td>{rate[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showError && (
          <p className={styles.error}>{this.genericErrorMessage}</p>
        )}
      </div>
    );
  }
}

export default ExchangeRates;
