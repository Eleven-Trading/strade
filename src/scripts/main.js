const vueApp = new Vue({

    components: {},
    el: '#vapp',

    data() {
        return {
            loggedInn: false,
            oktaBaseUrl: "OKTA_BASE_URL",
            oktaClientId: "OKTA_CLIENT_ID",
            fmp_api: "FMP_API",
            tickerListSettings: {
                marketCapLowerThan: 2000000000,
                volumeLessThan: 500000000,
                exchange: "NYSE,NASDAQ,amex"
            },
            showAlert: false,
            showInfo: false,
            showSettings: false,
            showFilter: true,
            filterArray: [{
                label: "Minimum Volume",
                range: "minVol",
                array: "minVolumeArray"
            }, {
                label: "Minimum price",
                range: "minPrice",
                array: "priceArray"
            }, {
                label: "Maximum price",
                range: "maxPrice",
                array: "priceArray"
            }, {
                label: "Min Price Chge(¢)",
                range: "minPriceDiff",
                array: "minPriceDiffArray"
            }, {
                label: "Min Price Chge(%)",
                range: "minPricePc",
                array: "minPricePcArray"
            }, {
                label: "Min Volume Chge(%)",
                range: "minVolPc",
                array: "minVolPcArray"
            }],
            highLowArray: [{
                value: ">",
                text: ">"
            }, {
                value: ">=",
                text: ">="
            }, {
                value: "<",
                text: "<"
            }, {
                value: "<=",
                text: "<="
            }],
            orAnd: [{
                value: "||",
                text: "OR"
            }, {
                value: "&&",
                text: "AND"
            }],
            colorArray: [{
                value: "green1",
                text: "green1"
            }, {
                value: "green2",
                text: "green2"
            }, {
                value: "green3",
                text: "green3"
            }, {
                value: "green4",
                text: "green4"
            }, {
                value: "red",
                text: "red"
            }, {
                value: "redLight",
                text: "redLight"
            }],
            colorsType: null,
            showAndOr1: false,
            showAndOr2: false,
            showAndOr3: false,
            colorsHighLow1: null,
            colorsValue1: null,
            andOr1: null,
            colorsHighLow2: null,
            colorsValue2: null,
            andOr2: null,
            colorsHighLow3: null,
            colorsValue3: null,
            andOr3: null,
            colorsHighLow4: null,
            colorsValue4: null,
            colorsColor: null,
            colors: {
                price: [{
                    color: "green1",
                    desc: "(price>=2 AND price<2.5) OR (price>=10 AND price<12)",
                    js: "(updateItem.price>=2 && updateItem.price<2.5) || (updateItem.price>=10 && updateItem.price<12)"
                }, {
                    color: "green2",
                    desc: "(price>=2.5 AND price<3.5) OR (price>=9 AND price<10)",
                    js: "(updateItem.price>=2.5 && updateItem.price<3.5) || (updateItem.price>=9 && updateItem.price<10)"
                }, {
                    color: "green3",
                    desc: "(price>=3.5 AND price<4) OR (price>=8 AND price<9)",
                    js: "(updateItem.price>=3.5 && updateItem.price<4) || (updateItem.price>=8 && updateItem.price<9)"
                }, {
                    color: "green4",
                    desc: "price>=4 AND price<8",
                    js: "updateItem.price>=4 && updateItem.price<8"
                }, {
                    color: "red",
                    desc: "price<2",
                    js: "updateItem.price<2"
                }],
                volume: [{
                    color: "green1",
                    desc: "(volume>=1500000 AND volume<3000000)",
                    js: "(updateItem.volume>=1500000 && updateItem.volume<3000000)"
                }, {
                    color: "green2",
                    desc: "(volume>=3000000 AND volume<5000000)",
                    js: "(updateItem.volume>=3000000 && updateItem.volume<5000000)"
                }, {
                    color: "green3",
                    desc: "(volume>=5000000 AND volume<10000000)",
                    js: "(updateItem.volume>=5000000 && updateItem.volume<10000000)"
                }, {
                    color: "green4",
                    desc: "volume>=10000000",
                    js: "updateItem.volume>=10000000"
                }, {
                    color: "red",
                    desc: "volume<1500000",
                    js: "updateItem.volume<1500000"
                }],
                float: [{
                    color: "green1",
                    desc: "(float>=20000000 AND float<30000000) OR (float>=100000000 AND float<120000000)",
                    js: "(shareFloat>=20000000 && shareFloat<30000000) || (shareFloat>=100000000 && shareFloat<120000000)"
                }, {
                    color: "green2",
                    desc: "(float>=30000000 AND float<40000000) OR (float>=90000000 AND float<100000000)",
                    js: "(shareFloat>=30000000 && shareFloat<40000000) || (shareFloat>=90000000 && shareFloat<100000000)"
                }, {
                    color: "green3",
                    desc: "(float>=40000000 AND float<60000000) OR (float>=80000000 AND float<90000000)",
                    js: "(shareFloat>=40000000 && shareFloat<60000000) || (shareFloat>=80000000 && shareFloat<90000000)"
                }, {
                    color: "green4",
                    desc: "float>=60000000 AND float<80000000",
                    js: "shareFloat>=60000000 && shareFloat<80000000"
                }, {
                    color: "red",
                    desc: "float<20000000",
                    js: "shareFloat<20000000"
                }],
                priceChange: [{
                    color: "green1",
                    desc: "price increase>=0.075 AND price increase<0.10",
                    js: "priceDiff>=0.075 && priceDiff<0.10"
                }, {
                    color: "green2",
                    desc: "price increase>=0.10 AND price increase<0.15",
                    js: "priceDiff>=0.10 && priceDiff<0.15"
                }, {
                    color: "green3",
                    desc: "price increase>=0.15 AND price increase<0.20",
                    js: "priceDiff>=0.15 && priceDiff<0.20"
                }, {
                    color: "green4",
                    desc: "price increase>=0.20",
                    js: "priceDiff>=0.20"
                }],
                priceChangePc: [{
                    color: "green1",
                    desc: "price increase pc>=1 AND price increase pc<2",
                    js: "pricePc>=1 && pricePc<2"
                }, {
                    color: "green2",
                    desc: "price increase pc>=2 AND price increase pc<3",
                    js: "pricePc>=2 && pricePc<3"
                }, {
                    color: "green3",
                    desc: "price increase pc>=3 AND price increase pc<4",
                    js: "pricePc>=3 && pricePc<4"
                }, {
                    color: "green4",
                    desc: "price increase pc>=4",
                    js: "pricePc>=4"
                }],
                volumeChangePc: [{
                    color: "green1",
                    desc: "volume change pc>=2 AND volume change pc<5",
                    js: "volumePc>=2 && volumePc<5"
                }, {
                    color: "green2",
                    desc: "volume change pc>=5 AND volume change pc<7.5",
                    js: "volumePc>=5 && volumePc<7.5"
                }, {
                    color: "green3",
                    desc: "volume change pc>=7.5 AND volume change pc<10",
                    js: "volumePc>=7.5 && volumePc<10"
                }, {
                    color: "green4",
                    desc: "volume change pc>=10",
                    js: "volumePc>=10"
                }, {
                    color: "red",
                    desc: "volume change pc<0",
                    js: "volumePc<0"
                }]
            },
            colorModal: null,
            showExclTickers: true,
            alertMessage: null,
            infoMessage: null,
            items: null,
            sound: true,
            voice: 49,
            voiceVolume: 0.9,
            unfollowArray: localStorage.getItem('unfollowArray') ?
                localStorage
                .getItem('unfollowArray')
                .split(',') : [],
            followArray: localStorage.getItem('followArray') ?
                localStorage
                .getItem('followArray')
                .split(',') : [],
            alertArray: localStorage.getItem('alertArray') ?
                localStorage
                .getItem('alertArray')
                .split(',') : [],
            alertTicker: null,
            alertPrice: null,
            /* Google US English(49), Google UK English Female (50), Google UK English Male (51), Thomas (0), Alex (1), Alice (2) */
            originalTimeout: null,
            firstSecInterval: null,
            oneMinInterval: null,
            secInterval: null,
            newOneMinInterval: null,
            newSecInterval: null,
            gettingOneMinSnapshot: false,
            gettingSecSnapshot: false,
            secUpdate: localStorage.getItem('secUpdate') ? localStorage.getItem('secUpdate') : 10,
            secUpdateArray: [{
                    value: 0,
                    label: "STOP"
                }, {
                    value: 5,
                    label: "5s"
                }, {
                    value: 10,
                    label: "10s"
                }, {
                    value: 15,
                    label: "15s"
                }, {
                    value: 20,
                    label: "20s"
                }

            ],
            newSecIntervalTimeout: localStorage.getItem('newSecIntervalTimeout') ? localStorage.getItem('newSecIntervalTimeout') : 0.75,
            minVolume: localStorage.getItem('minVolume') ? localStorage.getItem('minVolume') : 1000000,
            minVolumeArray: [{
                value: 750000,
                label: "750k"
            }, {
                value: 800000,
                label: "800k"
            }, {
                value: 900000,
                label: "900k"
            }, {
                value: 1000000,
                label: "1M"
            }, {
                value: 1500000,
                label: "1.5M"
            }, {
                value: 2000000,
                label: "2M"
            }],
            maxVolume: 500000000,
            priceArray: [{
                value: 0,
                label: "0$"
            }, {
                value: 1,
                label: "1$"
            }, {
                value: 2,
                label: "2$"
            }, {
                value: 3,
                label: "3$"
            }, {
                value: 4,
                label: "4$"
            }, {
                value: 5,
                label: "5$"
            }, {
                value: 6,
                label: "6$"
            }, {
                value: 7,
                label: "7$"
            }, {
                value: 8,
                label: "8$"
            }, {
                value: 9,
                label: "9$"
            }, {
                value: 10,
                label: "10$"
            }, {
                value: 11,
                label: "11$"
            }, {
                value: 12,
                label: "12$"
            }, {
                value: 13,
                label: "13$"
            }, {
                value: 14,
                label: "14$"
            }, {
                value: 15,
                label: "15$"
            }, {
                value: 16,
                label: "16$"
            }, {
                value: 17,
                label: "17$"
            }, {
                value: 18,
                label: "18$"
            }, {
                value: 19,
                label: "19$"
            }, {
                value: 20,
                label: "20$"
            }],
            minPrice: localStorage.getItem('minPrice') ?
                localStorage.getItem('minPrice') : 1,
            maxPrice: localStorage.getItem('maxPrice') ?
                localStorage.getItem('maxPrice') : 10,
            minPriceDiff: localStorage.getItem('minPriceDiff') ?
                localStorage.getItem('minPriceDiff') : 0.075,
            minPriceDiffArray: [{
                value: 0.025,
                label: "2.5¢"
            }, {
                value: 0.05,
                label: "5¢"
            }, {
                value: 0.075,
                label: "7.5¢"
            }, {
                value: 0.1,
                label: "10¢"
            }, {
                value: 0.125,
                label: "12.5¢"
            }, {
                value: 0.15,
                label: "15¢"
            }],
            minPricePc: localStorage.getItem('minPricePc') ?
                localStorage.getItem('minPricePc') : 0.75,
            minPricePcArray: [{
                value: 0.25,
                label: "0.25%"
            }, {
                value: 0.5,
                label: "0.50%"
            }, {
                value: 0.75,
                label: "0.75%"
            }, {
                value: 1,
                label: "1%"
            }, {
                value: 1.25,
                label: "1.25%"
            }, {
                value: 1.5,
                label: "1.5%"
            }, {
                value: 1.75,
                label: "1.75%"
            }, {
                value: 2,
                label: "2%"
            }],
            minVolPc: localStorage.getItem('minVolPc') ?
                localStorage.getItem('minVolPc') : 0.05,
            minVolPcArray: [{
                value: 0,
                label: "0%"
            }, {
                value: 0.05,
                label: "0.05%"
            }, {
                value: 0.1,
                label: "0.10%"
            }, {
                value: 0.25,
                label: "0.25%"
            }, {
                value: 0.5,
                label: "0.50%"
            }, {
                value: 0.75,
                label: "0.75%"
            }, {
                value: 1,
                label: "1%"
            }, {
                value: 5,
                label: "5%"
            }, {
                value: 10,
                label: "10%"
            }, {
                value: 20,
                label: "20%"
            }],
            tickerArray: null,
            shareFloatArray: null,
            oneMinSnapshot: [],
            fiveMinSnapshot: [],
            secSnapshot: [],
            maxTickerAnnounc: 5
        }
    },
    computed: {
        newSecIntervalTimeoutArray() {
            temp = [{
                    value: 0.25,
                    label: Math.ceil(this.secUpdate * 0.25) + "s"
                },
                {
                    value: 0.5,
                    label: Math.ceil(this.secUpdate * 0.5) + "s"
                },
                {
                    value: 0.75,
                    label: Math.ceil(this.secUpdate * 0.75) + "s"
                }
            ]
            return temp
        }
    },
    /***********************
     *
     * CREATED
     *
     ***********************/
    created() {},

    /***********************
     *
     * MOUNTED
     *
     ***********************/
    mounted: async function() {
        mountedFunction = async () => {
            
            /*
             *1. Avoid annoying speechsynthesis error and alert that speech is activated. Remember that user needs to interact with the screen. A better option is to make an alert to make sure user interacts with page on load.
             */
            speechFunction = () => {
                var msg = new SpeechSynthesisUtterance();
                var voices = speechSynthesis.getVoices();
                msg.voice = voices[this.voice];
                msg.rate = 0.9; // From 0.1 to 10
                msg.lang = 'en';
                msg.volume = this.voiceVolume
                msg.text = "Speech is activated";
                window
                    .speechSynthesis
                    .speak(msg);
            }
            await speechFunction()

            /*
             *2. Getting JSON with symbols and share float
             */
            this.getFloatTickers()

            /*
             *3. Get list of tickers to observer
             */
            const a = await this.getTickerList()
            this.tickerArray = a.tickerArray
            if (Array.isArray(a.error) && a.error.length) {
                this.alertMessage = a.error
                this.showAlert = true
            }

            /*
             *4. Compare ticker list to one minute and second values (making sure not to overlap each other => start at full minute and setTimeout for sec update, 8 seconds later)
             */
            await this.startIntervals()

            /*
             *5. Other
             */

            // UNFOLLOW TICKER
            this.unfollowTicker()

            // FOLLOW TICKER
            this.followTicker()

            // TICKER ALERT
            this.tickerAlert()

            var tooltipTriggerList = []
                .slice
                .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl)
            })

            /*for(element in this.colors) {
                console.log("element "+element)
                this.colors[element].forEach(el => {
                    console.log("el js "+el.js)
                    if(eval(element.js)){
                        console.log('css '+el.color)
                    }
                    
                })
            }*/
        }

        if ((this.oktaBaseUrl != '' || this.oktaBaseUrl != 'OKTA_BASE_URL') && (this.oktaClientId != '' || this.oktaClientId != 'OKTA_CLIENT_ID')) {
            console.log("LAUNCHING WEBSITE WITH OKTA")
            await this.oktaLogin()

            if (this.loggedInn == true) {
                mountedFunction()
            }
        } else {
            console.log("LAUNCHING WEBSITE WITHOUT OKTA")
            this.loggedInn = true
            mountedFunction()
        }

    },

    watch: {
        secUpdate: function() {
            console.log(" -> secUpdate " + this.secUpdate)
            localStorage.setItem('secUpdate', this.secUpdate)
        },
        newSecIntervalTimeout: function() {
            console.log(" -> newSecIntervalTimeout " + this.newSecIntervalTimeout)
            localStorage.setItem('newSecIntervalTimeout', this.newSecIntervalTimeout)
        },
        minVolume: function() {
            console.log(" -> minVolume " + this.minVolume)
            localStorage.setItem('minVolume', this.minVolume)
        },
        minPrice: function() {
            console.log(" -> minPrice " + this.minPrice)
            localStorage.setItem('minPrice', this.minPrice)
        },
        maxPrice: function() {
            console.log(" -> maxPrice " + this.maxPrice)
            localStorage.setItem('maxPrice', this.maxPrice)
        },
        minPriceDiff: function() {
            console.log(" -> minPriceDiff " + this.minPriceDiff)
            localStorage.setItem('minPriceDiff', this.minPriceDiff)
        },
        minPricePc: function() {
            console.log(" -> minPricePc " + this.minPricePc)
            localStorage.setItem('minPricePc', this.minPricePc)
        },
        minVolPc: function() {
            console.log(" -> minVolPc " + this.minVolPc)
            localStorage.setItem('minVolPc', this.minVolPc)
        }
    },

    methods: {
        oktaLogin() {
            console.log("url " + window.location.href)
            let oktaSignIn = new OktaSignIn({
                baseUrl: this.oktaBaseUrl,
                clientId: this.oktaClientId,
                redirectUri: window.location.href,
                authParams: {
                    issuer: this.oktaBaseUrl + "/oauth2/default"
                }
            });
            return new Promise((resolve) => {
                oktaSignIn.authClient.token.getUserInfo().then((user) => {
                    //Is logged
                    this.fmp_api = user.fmp_api
                    document.getElementById("logout").style.display = 'block';
                    this.loggedInn = true
                    resolve()
                }, function(error) {
                    oktaSignIn.showSignInToGetTokens({
                        el: '#okta-login-container'
                    }).then(function(tokens) {
                        //Create loggin
                        oktaSignIn.authClient.tokenManager.setTokens(tokens);
                        oktaSignIn.remove();
                        location.reload();
                        resolve()

                    }).catch(function(err) {
                        console.error(err);
                        resolve()
                    });
                })
            })
        },

        oktaLogout() {
            let oktaSignIn = new OktaSignIn({
                baseUrl: "https://dev-24207013.okta.com",
                clientId: "0oa8zkluj067EKkF85d6",
                redirectUri: 'http://localhost:3000',
                authParams: {
                    issuer: "https://dev-24207013.okta.com/oauth2/default"
                }
            });

            oktaSignIn.authClient.signOut();
            this.loggedInn = true
            location.reload();
        },
        clearLocalStorage() {
            localStorage.clear()
            location.reload();
            return false
        },
        addColors() {
            console.log("colors " + this.colorsType + ", " + this.colorsHighLow1 + ", " + this.colorsValue1 + " color " + this.colorsColor)
                //"{'green1': (snapshot.updatePrice>=2 && snapshot.updatePrice<2.5) || (snapshot.updatePrice>=10 && snapshot.updatePrice<12), 'green2': (snapshot.updatePrice>=2.5 && snapshot.updatePrice<3) || (snapshot.updatePrice>=9 && snapshot.updatePrice<10), 'green3': (snapshot.updatePrice>=3.5 && snapshot.updatePrice<4) || (snapshot.updatePrice>=8 && snapshot.updatePrice<9), 'green4': snapshot.updatePrice>=4 && snapshot.updatePrice<8, 'red': snapshot.updatePrice<2}"

            if (this.colorsType == "price") {
                var element = "updateItem.price"
            }
            if (this.colorsType == "volume") {
                var element = "updateItem.volume"
            }
            if (this.colorsType == "float") {
                var element = "float"
            }
            if (this.colorsType == "priceChange") {
                var element = "priceDiff"
            }
            if (this.colorsType == "priceChangePc") {
                var element = "pricePc"
            }
            if (this.colorsType == "volumeChangePc") {
                var element = "volumePc"
            }

            if (this.colorsValue1 != null) {
                var tempCss = "'" + this.colorsColor + "': (" + element + " " + this.colorsHighLow1 + " " + this.colorsValue1 + ")"
            }

            if (this.colorsValue2 != null) {
                var tempCss = "'" + this.colorsColor + "': (" + element + " " + this.colorsHighLow1 + " " + this.colorsValue1 + " " + this.andOr1 + " " + element + " " + this.colorsHighLow2 + " " + this.colorsValue2 + ")"
            }

            if (this.colorsValue3 != null) {
                var tempCss = "'" + this.colorsColor + "': (" + element + " " + this.colorsHighLow1 + " " + this.colorsValue1 + " " + this.andOr1 + " " + element + " " + this.colorsHighLow2 + " " + this.colorsValue2 + ") " + this.andOr2 + " (" + element + " " + this.colorsHighLow3 + " " + this.colorsValue3 + ")"
            }

            if (this.colorsValue4 != null) {
                var tempCss = "'" + this.colorsColor + "': (" + element + " " + this.colorsHighLow1 + " " + this.colorsValue1 + " " + this.andOr1 + " " + element + " " + this.colorsHighLow2 + " " + this.colorsValue2 + ") " + this.andOr2 + " (" + element + " " + this.colorsHighLow3 + " " + this.colorsValue3 + " " + this.andOr3 + " " + element + " " + this.colorsHighLow4 + " " + this.colorsValue4 + ")"
            }

            //Check if color alredy exists.
            //https://medium.com/javascript-in-plain-english/react-updating-a-value-in-state-array-7bae7c7eaef9
            console.log("this.colors before index " + JSON.stringify(this.colors) + " and color " + this.colorsColor)
            var elementsIndex = this
                .colors[this.colorsType]
                .findIndex(element => element.color == this.colorsColor)

            //if yes, replace
            if (elementsIndex >= 0) {
                var newArray = [...this.colors[this.colorsType]]
                newArray[elementsIndex] = {
                    ...newArray[elementsIndex],
                    css: tempCss
                }
                this.colors[this.colorsType] = newArray
                console.log("this.colors " + JSON.stringify(this.colors))
            } else { // if not, add
                var temp = {}
                temp.color = this.colorsColor
                temp.css = tempCss
                this
                    .colors[this.colorsType]
                    .push(temp)
                console.log("this.colors " + JSON.stringify(this.colors))
            }

        },
        // UNFOLLOW TICKER
        unfollowTicker() {
            //https://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/
            $('#unfollowArray').on('beforeItemAdd', (event) => {
                if (event.item !== event.item.toUpperCase()) {
                    event.cancel = true;
                    $('#unfollowArray').tagsinput('add', event.item.toUpperCase());
                }
            });

            $('#unfollowArray').on('itemAdded', (event) => {
                console.log("Item to add " + event.item)
                this
                    .unfollowArray
                    .push(event.item)
                console.log("Items to unfollow " + this.unfollowArray)
                localStorage.setItem('unfollowArray', this.unfollowArray);
                console.log("local storage unfollow " + localStorage.getItem('unfollowArray'))

            });
            $('#unfollowArray').on('itemRemoved', (event) => {
                console.log("Item to remove from unfollow " + this.unfollowArray + " is " + event.item)
                this.unfollowArray = this
                    .unfollowArray
                    .filter(item => item !== event.item)
                console.log("Items to unfollow " + this.unfollowArray)
                localStorage.setItem('unfollowArray', this.unfollowArray);
            });
        },

        addUnFollow(param) {
            console.log("row unfollow " + param)
            $('#unfollowArray').tagsinput('add', param.toUpperCase());
        },

        // FOLLOW TICKER
        followTicker() {
            $('#followArray').on('beforeItemAdd', (event) => {
                if (event.item !== event.item.toUpperCase()) {
                    event.cancel = true;
                    $('#followArray').tagsinput('add', event.item.toUpperCase());
                }
            });

            $('#followArray').on('itemAdded', (event) => {
                console.log("Item to add " + event.item)
                this
                    .followArray
                    .push(event.item)
                console.log("Items in following Array " + this.followArray)
                localStorage.setItem('followArray', this.followArray);
                console.log("local storage followArray " + localStorage.getItem('followArray'))

            });
            $('#followArray').on('itemRemoved', (event) => {
                console.log("Item to remove from follow " + event.item)
                this.followArray = this
                    .followArray
                    .filter(item => item !== event.item)
                console.log("Items to follow " + this.followArray)
                localStorage.setItem('followArray', this.followArray);
            });
        },

        addFollow(param) {
            console.log("row follow " + param)
            $('#followArray').tagsinput('add', param.toUpperCase());
            /*this
                .followArray
                .push(param.toUpperCase())*/
            //$('#unfollowArray').tagsinput('add', event.item.toUpperCase());
        },

        // TICKER ALERT
        tickerAlert() {
            $('#alertArray').on('beforeItemAdd', (event) => {
                ticker = event
                    .item
                    .split('@')[0]
                price = event
                    .item
                    .split('@')[1]
                if (ticker !== ticker.toUpperCase()) {
                    event.cancel = true;
                    $('#alertArray').tagsinput('add', ticker.toUpperCase() + "@" + price);
                }
            });

            $('#alertArray').on('itemAdded', (event) => {
                console.log("Item to add " + event.item)
                this
                    .alertArray
                    .push(event.item)
                console.log("Items in alertArray " + this.alertArray)
                localStorage.setItem('alertArray', this.alertArray);
                console.log("local storage alertArray " + localStorage.getItem('alertArray'))
            });

            $('#alertArray').on('itemRemoved', (event) => {
                console.log("Item to remove from follow " + event.item)
                this.alertArray = this
                    .alertArray
                    .filter(item => item !== event.item)
                console.log("Items in alertArray " + this.alertArray)
                localStorage.setItem('alertArray', this.alertArray);
            });

        },

        addAlert() {

            $('#alertArray').tagsinput('add', this.alertTicker.toUpperCase() + "@" + this.alertPrice);
            this.alertTicker = null
            this.alertPrice = null
        },

        // GET JSON WITH SYMBOLS AND SHARE FLOAT
        getFloatTickers() {
            var error = []
            console.log("GETTING JSON WITH SYMBOLS AND SHARE FLOAT ")
            floatTickersUrl = "https://7ak-public.s3.amazonaws.com/floatTickers.json"
                //var floatTickers = await (await fetch(floatTickersUrl)).json();
                //console.log("JSON is " + JSON.stringify(floatTickers))
            axios
                .get(floatTickersUrl)
                .then((response) => {
                    this.shareFloatArray = response.data
                        //console.log("array from remote " + JSON.stringify(this.shareFloatArray))
                })
                .catch((e) => {
                    error.push("Getting float and tickers error " + e)
                    this.alertMessage = error
                    this.showAlert = true
                });
        },

        //GET TICKER LIST
        getTickerList() {
            console.log("GETTING TICKER LIST ")
            return new Promise((resolve) => {
                var error = []
                url = "https://financialmodelingprep.com/api/v3/stock-screener"
                axios
                    .get(url, {
                        params: {
                            marketCapLowerThan: this.tickerListSettings.marketCapLowerThan,
                            volumeLessThan: this.tickerListSettings.volumeLessThan,
                            exchange: this.tickerListSettings.exchange,
                            apikey: this.fmp_api
                        }
                    })
                    .then(response => {
                        if (typeof response.data[0] === 'undefined' || response.data[0] === null) {
                            console.log(" -> Ticker array is null")
                            error.push("Ticker array is null")
                        }
                        if (typeof response.data["Error Message"] != 'undefined' || response.data["Error Message"] != null) {
                            console.log(" -> Error retrieving with FMP " + JSON.stringify(response.data["Error Message"]))
                            error.push(response.data["Error Message"])
                        }
                        var tickerArray = []
                            //console.log(" -> full ticker list " + JSON.stringify(response.data))
                        for (key in response.data) {

                            tickerArray.push(response.data[key].symbol)
                        }
                        //console.log(" -> Ticker list : " + tickerArray)
                        resolve({ tickerArray, error })

                    })
                    .catch(e => {
                        error.push("axios error: " + e.message)
                        console.log("error " + e)
                        resolve({ error })
                    })
            })
        },

        //START INTERVALS
        startIntervals() {
            var info = []
            this.stopIntervals()
            console.log("STARTING TIMER WITH 1 MIN WITH AN UPDATE EVERY " + this.secUpdate + " SECOND @ " + this.secUpdate * this.newSecIntervalTimeout + " SECONDS")
                //console.log(" -> Ticker array : " + JSON.stringify(this.tickerArray))
            var date = new Date();
            console.log((60 - date.getSeconds()) + " seconds left to full minute")
            info.push((60 - date.getSeconds()) + " seconds left to full minute")
            this.infoMessage = info
            this.showInfo = true

            this.originalTimeout = setTimeout(() => { //setTimeout = wait for full minute to start

                var minuteDate = new Date();
                //the first time the page loads, we launch already the first 1 minute function
                console.log("it's the first full minute")
                this.getSnapshot("oneMin")

                //ONE MINUTE INTERVAL
                // 1- create function
                oneMinFunction = () => {
                    this.oneMinInterval = setInterval(() => {
                        this.getSnapshot("oneMin")
                    }, 60 * 1000);
                }

                // 2- call function
                oneMinFunction()

                //SECONDS INTERVAL (can be updated via variable)
                // 1- create function
                secFunction = () => {
                    console.log("it's the first sec update")
                    this.getSnapshot("secUpdate")
                        //after the first sec update, which happens after newSecIntervalTimeout seconds, we create a secInterval every secUpdate
                    this.secInterval = setInterval(() => {
                        this.getSnapshot("secUpdate")

                    }, this.secUpdate * 1000);
                }

                // 2- call function : we start after newSecIntervalTimeout seconds
                this.firstSecInterval = setTimeout(secFunction, (this.secUpdate * this.newSecIntervalTimeout * 1000))

            }, (60 - date.getSeconds()) * 1000);

        },

        //STOP INTERVALS
        stopIntervals() {
            console.log("CLEARING TIMEOUT AND INTERVALS")
            clearTimeout(this.originalTimeout)
            clearTimeout(this.firstSecInterval)
            clearInterval(this.oneMinInterval)
            clearInterval(this.secInterval)
            clearTimeout(this.newOneMinInterval)
            clearTimeout(this.newSecInterval)
        },

        //GET SNAPSHOTS (1 MINUTE AND SECONDS)
        getSnapshot(param) {
            var error = []
            var date = new Date();
            console.log(param.toUpperCase() + " SNAPSHOT at " + date.getSeconds())

            if (param == "fiveMin") {
                this.fiveMinSnapshot = []
            }
            if (param == "oneMin") {
                this.oneMinSnapshot = []
            }
            if (param == "secUpdate") {
                if (!!this.secSnapshot && this.secSnapshot.find(secItem => moment().diff(moment.unix(secItem.time), 'seconds') >= this.secUpdate && moment().diff(moment.unix(secItem.time), 'seconds') < 2 * this.secUpdate)) {
                    //console.log("last secupdate array is " + JSON.stringify(this.secSnapshot.find(secItem => moment().diff(moment.unix(secItem.time), 'seconds') >= this.secUpdate && moment().diff(moment.unix(secItem.time), 'seconds') < 2 * this.secUpdate)))
                }
            }

            //FinancialModelPrep can only handle a maxBatch for each quote call. 
            //So we iterate per batch, numIterations
            var i
            var j = 1
            var maxNumber = this.tickerArray.length
            var maxBatch = 1500
            var numIterations = maxNumber / maxBatch
            var tempSecArray = []
                //console.log("Ticker array lenght " + this.tickerArray.length)
            for (i = 0; i < maxNumber; i += maxBatch) {
                let nextBatch
                let url

                //console.log("ITERATION " + (i + 1) + " to " + (i + maxBatch))
                if ((maxNumber - i) >= maxBatch) {
                    nextBatch = maxBatch
                } else { // this is last loop
                    nextBatch = maxNumber - i
                }

                //FMP has a limit of 10 API calls/min. To avoid collision between minute and sec updates, we use different urls
                if (param == "fiveMin" || param == "oneMin") {
                    console.log(" -> using min FMP url")
                    url = "https://fmpcloud.io/api/v3/quote/" + this
                        .tickerArray
                        .slice(i, (i + nextBatch))
                        //console.log("URL is " + url)
                }

                if (param == "secUpdate") {
                    console.log(" -> using sec FMP url")
                    url = "https://financialmodelingprep.com/api/v3/quote/" + this
                        .tickerArray
                        .slice(i, (i + nextBatch))
                }

                axios
                    .get(url, {
                        params: {
                            apikey: this.fmp_api
                        }
                    })
                    .then(response => {
                        console.log(" -> " + param.toUpperCase() + " data retrieved from FMP")
                            //console.log("response "+JSON.stringify(response.data))
                        if (param == "fiveMin" || param == "oneMin") {
                            var minVol = this.minVolume
                            var maxVol = this.maxVolume
                            var minPx = this.minPrice
                            var maxPx = this.maxPrice

                            var filterData = response
                                .data
                                .filter((fil) => {
                                    return fil.price >= minPx && fil.price <= maxPx && fil.volume >= minVol && fil.volume < maxVol && fil.marketCap < 2000000000
                                });

                            if (param == "fiveMin") {
                                this.fiveMinSnapshot = [
                                    ...this.fiveMinSnapshot,
                                    ...filterData
                                ]
                            }
                            if (param == "oneMin") {
                                //console.log("oneMin iteration " + j )
                                if (j >= numIterations) { //getting last iteration
                                    //this.gettingOneMinSnapshot = false
                                }
                                this.oneMinSnapshot = [
                                        ...this.oneMinSnapshot,
                                        ...filterData
                                    ]
                                    /**/
                                    ++j
                            }
                        }
                        if (param == "secUpdate") {
                            response
                                .data
                                .forEach(updateItem => {

                                    /*
                                    /* ------- 1 ------- 
                                    /*
                                    /* Check if ticker is in alert array
                                    /*
                                    */
                                    var elementsIndex = this
                                        .alertArray
                                        .findIndex(element => element.ticker == updateItem.symbol)

                                    if (elementsIndex >= 0) {

                                        var alertStatus = this
                                            .alertArray[elementsIndex]
                                            .alert
                                        console
                                            .log(" -> Alert status of symbol " + updateItem.symbol + " is " + alertStatus)

                                        var alertPrice = this
                                            .alertArray[elementsIndex]
                                            .price

                                        //if current price above alert price and alert false we update alert status
                                        //Update value in tested array
                                        //https://medium.com/javascript-in-plain-english/react-updating-a-value-in-state-array-7bae7c7eaef9
                                        if (updateItem.price >= alertPrice && alertStatus === false) {
                                            console.log("-> Current price is " + updateItem.price + ", above alert price and alert is false. We send new alert")
                                            var newArray = [...this.alertArray]
                                            newArray[elementsIndex] = {
                                                ...newArray[elementsIndex],
                                                alert: !newArray[elementsIndex].alert
                                            }
                                            this.alertArray = newArray
                                            console.log(" -> Items in alert Array " + JSON.stringify(this.alertArray))
                                            const audio = new Audio("medias/notification_simple_ui_6.mp3");
                                            audio.volume = 1
                                            audio.play();
                                            if (this.sound) {
                                                msg.voice = voices[this.voice];
                                                msg.rate = 0.9; // From 0.1 to 10
                                                msg.lang = 'en';
                                                msg.volume = this.voiceVolume
                                                msg.text = "Price alert on, " + updateItem.symbol;
                                                window
                                                    .speechSynthesis
                                                    .speak(msg);
                                            }
                                        }

                                        //if current price is (back) below alert price and alert is true we update alert status
                                        if (updateItem.price < alertPrice && alertStatus === true) {
                                            console.log("-> Current price is back below alert price and alert is true. We update alert status back to false")
                                            var newArray = [...this.alertArray]
                                            newArray[elementsIndex] = {
                                                ...newArray[elementsIndex],
                                                alert: !newArray[elementsIndex].alert
                                            }
                                            this.alertArray = newArray
                                            console.log(" -> Items in alert Array " + JSON.stringify(this.alertArray))
                                        }
                                    }

                                    /*
                                    /* ------- 2 ------- 
                                    /*
                                    /* Check if One min snapshot exists and that symbol exists in both one min and sec snapshot
                                    /*
                                    /*
                                    */

                                    if (!!this.oneMinSnapshot && this.oneMinSnapshot.find(oneMinItem => oneMinItem.symbol === updateItem.symbol) != undefined) {

                                        /* Find the whole object of the symbol that matches */
                                        var oneMinObject = this
                                            .oneMinSnapshot
                                            .find(oneMinItem => oneMinItem.symbol === updateItem.symbol)
                                            //console.log("There is a match. one min object is " + JSON.stringify(oneMinObject) + " and updateItem object is " + JSON.stringify(updateItem))
                                        var priceDiff = updateItem.price - oneMinObject.price
                                        var pricePc = ((updateItem.price - oneMinObject.price) / oneMinObject.price) * 100
                                        var volumePc = ((updateItem.volume - oneMinObject.volume) / oneMinObject.volume) * 100
                                            //console.log("-> priceDiff "+priceDiff+", volume pc "+volumePc+ "and min vol pc "+this.minVolPc)

                                        /* Check if symobol is in unfollow array */
                                        var tickerUnfollow = this
                                            .unfollowArray
                                            .includes(updateItem.symbol)

                                        /* If requirements are met and symbol/ticker is not marked as excluded, include in MOMO table */
                                        if (priceDiff >= this.minPriceDiff && pricePc >= this.minPricePc && volumePc >= this.minVolPc && tickerUnfollow == false) {
                                            console.log(" -> MOMO data")
                                            var tempSec = {}
                                                //console.log("-> priceDiff "+priceDiff+", volume pc "+volumePc+ "and min vol pc "+this.minVolPc)

                                            /* Let's search for float in json */
                                            var shareFloatSearch = this
                                                .shareFloatArray
                                                .find(el => el.symbol === updateItem.symbol)
                                                //console.log("ticker float from JSON is symbol " + shareFloatSearch["symbol"] + " and float " + shareFloatSearch["shsFloat"]);
                                            if (typeof shareFloatSearch === 'undefined' || shareFloatSearch === null) {
                                                shareFloat = null
                                            } else {
                                                shareFloat = shareFloatSearch["shsFloat"]
                                            }

                                            //Let's check for color
                                            for (element in this.colors) {
                                                //console.log("element " + element)
                                                this.colors[element].forEach(el => {
                                                    //console.log("el js " + el.js)
                                                    if (eval(el.js)) {
                                                        //console.log('css ' + el.color)
                                                        tempSec[element + "_color"] = el.color
                                                    }

                                                })
                                            }


                                            //Let's create the secSnapshot json
                                            tempSec.time = updateItem.timestamp
                                            tempSec.symbol = updateItem.symbol
                                            tempSec.strategy = "Price up 1mn"
                                            tempSec.snapPrice = parseFloat(oneMinObject.price).toFixed(2)
                                            tempSec.updatePrice = parseFloat(updateItem.price).toFixed(2)
                                            tempSec.volume = updateItem.volume
                                            tempSec.float = shareFloat
                                            if (shareFloat == null || shareFloat == 0) {
                                                tempSec.floatRatio = 0
                                            } else {
                                                tempSec.floatRatio = parseFloat(updateItem.volume / shareFloat).toFixed(2)
                                            }
                                            tempSec.priceIncrease = parseFloat(priceDiff).toFixed(2)
                                            tempSec.priceIncreasePc = parseFloat(pricePc).toFixed(2)
                                            tempSec.volumeChange = parseFloat(volumePc).toFixed(2)
                                            tempSecArray.push(tempSec)
                                                /**/


                                        }
                                    }
                                })
                            if (j >= numIterations) { //getting last sec iteration
                                //console.log("it's the last Sec iteration")
                                if (typeof tempSecArray !== 'undefined' && tempSecArray.length > 0) {

                                    tempSecArray.sort(function(a, b) {
                                        return b.volumeChange - a.volumeChange;
                                    })


                                    tempSecArray.forEach((element, index) => {
                                        var msg = new SpeechSynthesisUtterance()
                                        var voices = speechSynthesis.getVoices()
                                            //console.log(JSON.stringify(element) + "a nd index " + index)
                                        if (this.sound && (index + 1) <= this.maxTickerAnnounc) {
                                            msg.voice = voices[this.voice];
                                            msg.rate = 0.9; // From 0.1 to 10
                                            msg.lang = 'en';
                                            msg.volume = this.voiceVolume
                                            msg.text = element.symbol;
                                            window
                                                .speechSynthesis
                                                .speak(msg);
                                        }
                                    });

                                    this
                                        .secSnapshot = tempSecArray.concat(this
                                            .secSnapshot)

                                    //this.gettingSecSnapshot = false
                                }
                            }
                            ++j
                        }

                    })
                    .catch(e => {
                        error.push(param + " snapshot " + e)
                        this.alertMessage = error
                        this.showAlert = true
                        console.log(" -> " + param.toUpperCase() + " snapshot error " + e)
                    })

            }

        }
    }
})