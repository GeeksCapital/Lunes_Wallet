import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setWalletLoading, getWalletCoinHistory } from "./redux/walletAction";
import { loadWalletInfo } from "../skeleton/redux/skeletonAction";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// COMPONENTS
import Loading from "../../components/loading";

// UTILS
import i18n from "../../utils/i18n";
import { formatDate } from "../../utils/numbers";
import { convertBiggestCoinUnit } from "../../utils/numbers";

class TransactionHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      toggleHistory: undefined
    };
  }

  componentDidMount() {
    let { wallet, coins, getWalletCoinHistory } = this.props;
    let address = coins[(wallet.selectedCoin = wallet.selectedCoin)].address;
    getWalletCoinHistory(wallet.selectedCoin, address);
  }

  stateDataHistory = key => {
    let { toggleHistory } = this.state;
    this.setState({
      toggleHistory: toggleHistory === key ? undefined : key
    });
  };

  reloadWallet = () => {
    let { setWalletLoading, loadWalletInfo, user } = this.props;
    setWalletLoading(true);
    loadWalletInfo(user.password);
  };

  renderHistory = () => {
    let { toggleHistory } = this.state;
    let { skeleton, wallet } = this.props;
    let selectedCoin = wallet.selectedCoin;
    let decimalPoint = skeleton.coins[selectedCoin].decimalPoint;
    let history = wallet.coinHistory.history.txs;

    if (!history || wallet.coinHistory.history <= 0) {
      return <div className={style.notFound}>Nothing Found</div>;
    }

    return Object.keys(history).map((val, index) => {
      let transaction = history[index];
      return (
        <div key={index}>
          <div>
            <Grid
              item
              xs={12}
              className={
                toggleHistory !== undefined && toggleHistory !== index
                  ? style.opacityItem
                  : style.itemHistorico
              }
              onClick={() => this.stateDataHistory(index)}
            >
              <Grid item xs={3} sm={2} className={style.typeItems}>
                <div>
                  <img
                    src={
                      "./images/icons/walletHistory/" +
                      transaction.type.toLowerCase() +
                      ".png"
                    }
                  />
                </div>
                <div className={style.dateHistory}>
                  {formatDate(transaction.date, "DM")}
                </div>
              </Grid>
              <Grid item xs={6} className={style.descriptionHistory}>
                {transaction.description}
              </Grid>
              <Grid item xs={4} className={style.valueHistory}>
                <div
                  className={
                    transaction.type === "RECEIVED"
                      ? style.receivedHistory
                      : style.sentHistory
                  }
                >
                  {transaction.type === "RECEIVED" || "-"}
                  {convertBiggestCoinUnit(
                    transaction.amount,
                    decimalPoint
                  ).toFixed(decimalPoint)}{" "}
                </div>
                <div> {/* transaction.price[defaultFiat] */} </div>
              </Grid>
            </Grid>

            <div>
              <Grid
                item
                xs={12}
                className={toggleHistory !== index ? style.toggleHistory : null}
              >
                <Grid item xs={12} className={style.itemDataHistorico}>
                  <Grid item xs={2}>
                    {" "}
                  </Grid>
                  <Grid item xs={6} sm={7}>
                    <div className={style.titleBlockExplorer}>
                      {"Blockexplorer"}
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={3}
                    className={style.alignTimeInValueHistory}
                  >
                    <div className={style.timeInValueHistory}>
                      {formatDate(transaction.date, "HMS")}
                    </div>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid item xs={12} className={style.itemDataHistorico}>
                    <Grid item xs={2} className={style.typeItems}>
                      <div> {"ID:"} </div>
                    </Grid>
                    <Grid item xs={10} className={style.descriptionHistory}>
                      <div>{transaction.txID}</div>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} className={style.itemDataHistorico}>
                    <Grid item xs={2} className={style.typeItems}>
                      <div className={style.fromTransactionHistory}>
                        {"De:"}
                      </div>
                    </Grid>
                    <Grid item xs={10} className={style.descriptionHistory}>
                      <div className={style.fromTransactionHistory}>
                        {transaction.from || "-"}
                      </div>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} className={style.itemDataHistorico}>
                    <Grid item xs={2} className={style.typeItems}>
                      <div className={style.forTransactionHistory}>
                        {"Para:"}
                      </div>
                    </Grid>
                    <Grid item xs={10} className={style.descriptionHistory}>
                      <div className={style.forTransactionHistory}>
                        {transaction.to}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    let { loading } = this.props.wallet.coinHistory;

    return (
      <div>
        <Grid className={style.containerTransactions}>
          <Grid item xs={11} sm={7} md={6}>
            <div className={style.alignItemsHeaderHistory}>
              <div
                className={style.refleshIcon}
                onClick={() => this.reloadWallet()}
              >
                <img src="images/icons/general/refresh.png" />
              </div>
              <div className={style.text}>
                {i18n.t("TRANSACTION_HISTORY_TITLE")}
              </div>
            </div>
            <div className={style.contentTransactions}>
              {loading ? (
                <Loading margin={"5% 0 0 0"} color="lunes" />
              ) : (
                this.renderHistory()
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

TransactionHistory.propTypes = {
  user: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired,
  coins: PropTypes.array.isRequired,
  skeleton: PropTypes.object.isRequired,
  loadWalletInfo: PropTypes.func.isRequired,
  setWalletLoading: PropTypes.func.isRequired,
  getWalletCoinHistory: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  user: store.user.user,
  wallet: store.wallet,
  coins: store.skeleton.coins,
  skeleton: store.skeleton
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadWalletInfo,
      setWalletLoading,
      getWalletCoinHistory
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(TransactionHistory);
