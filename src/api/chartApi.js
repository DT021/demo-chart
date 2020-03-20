import {readString} from 'react-papaparse';
import _ from 'lodash';

export default {
    onReady: cb => {
        setTimeout(() => cb(), 0);
    },
    searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    },
    resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        var split_data = symbolName.split(/[:/]/);
        var symbol_stub = {
            name: symbolName,
            description: '',
            type: 'crypto',
            session: '24x7',
            timezone: 'Etc/UTC',
            ticker: symbolName,
            exchange: split_data[0],
            minmov: 1,
            pricescale: 100,
            has_intraday: true,
            has_no_volume: true
        };

        setTimeout(function () {
            onSymbolResolvedCallback(symbol_stub);
        }, 0)
    },

    getBars: function (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
        fetch(process.env.REACT_APP_FILE_PATH).then(data => {
            return data.text();
        }).then(data => {
            let parsedData = _.chain(readString(data).data)
                .drop()
                .dropRight()
                .map(el => {
                    return {
                        time: (new Date(el[0])).getTime(),
                        open: el[1],
                        high: el[2],
                        low: el[3],
                        close: el[4]
                    }
                })
                .value();
            onHistoryCallback(parsedData, {noData: parsedData.length === 0});
        }).catch(() => {
            onHistoryCallback([], {noData: true});
        })
    },

    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
    },
    unsubscribeBars: subscriberUID => {
    },
};