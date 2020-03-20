import * as React from 'react';
import './ChartContainer.css';
import {widget} from '../../charting_library/charting_library.min';
import Datafeed from '../../api/chartApi';

class ChartContainer extends React.PureComponent {
    static defaultProps = {
        symbol: 'USD/EUR',
        interval: '60',
        containerId: 'tv_chart_container',
        libraryPath: '/demo-chart/charting_library/',
        chartsStorageUrl: 'https://saveload.tradingview.com',
        chartsStorageApiVersion: '1.1',
        clientId: 'tradingview.com',
        userId: 'public_user_id',
        fullscreen: false,
        autosize: true,
        studiesOverrides: {},
    };

    tvWidget = null;

    componentDidMount() {
        const widgetOptions = {
            symbol: this.props.symbol,
            // BEWARE: no trailing slash is expected in feed URL
            datafeed: Datafeed,
            interval: this.props.interval,
            container_id: this.props.containerId,
            library_path: this.props.libraryPath,
            locale: 'en',
            disabled_features: ['use_localstorage_for_settings'],
            charts_storage_url: this.props.chartsStorageUrl,
            charts_storage_api_version: this.props.chartsStorageApiVersion,
            client_id: this.props.clientId,
            user_id: this.props.userId,
            fullscreen: this.props.fullscreen,
            autosize: this.props.autosize,
            studies_overrides: this.props.studiesOverrides,
        };

        const tvWidget = new widget(widgetOptions);
        this.tvWidget = tvWidget;

        tvWidget.onChartReady(() => {
            tvWidget.headerReady().then(() => {
                const button = tvWidget.createButton();
                button.setAttribute('title', 'Click to show a notification popup');
                button.classList.add('apply-common-tooltip');
                button.addEventListener('click', () => tvWidget.showNoticeDialog({
                    title: 'Notification',
                    body: 'TradingView Charting Library API works correctly',
                    callback: () => {
                        console.log('Noticed!');
                    },
                }));

                button.innerHTML = 'Check API';
            });
        });
    }

    componentWillUnmount() {
        if (this.tvWidget !== null) {
            this.tvWidget.remove();
            this.tvWidget = null;
        }
    }

    render() {
        return (
            <div
                id={this.props.containerId}
                className={'TVChartContainer'}
            />
        );
    }
}

export default ChartContainer;