import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getProfessionalNode,
  setLeasingLoading,
  cancelLeasing
} from "../leasing/redux/leasingAction";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import i18n from "../../utils/i18n";
import { formatDate } from "../../utils/numbers";
import style from "./style.css";

class LeasingHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleHistory: undefined
    };
  }

  stateDataHistory = key => {
    let { toggleHistory } = this.state;
    this.setState({
      toggleHistory: toggleHistory === key ? undefined : key
    });
  };

  renderBtCancel = (status, txid) => {
    let { coinFee, decimalPoint, cancelLeasing, user } = this.props;
    if (status === 1) {
      return (
        <div className={style.iconLeasing} onClick={() => cancelLeasing({ txid, coinFee, decimalPoint, password: user.password })}>
          <img src="images/icons/general/leasing@1x.png" />
          {i18n.t("LEASING_BT_CANCEL")}
        </div>
      );
    } else {
      return null;
    }
  };

  renderHistory = () => {
    let { toggleHistory } = this.state;
    let { history } = this.props;
    const blockexplorer = "https://blockexplorer.lunes.io/tx/";

    if (!history || history === undefined) {
      return <div className={style.notFound}>Nothing Found</div>
    }

    return history.txs.map((value, index) => ((
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
            <Grid item xs={3}>
              {formatDate(value.date, "DM")}
              &nbsp; {formatDate(value.date, "HMS")}
            </Grid>
            <Grid item xs={3}>
              <span className={style.textGreen}>{value.amount}</span>
            </Grid>
            <Grid item xs={4}>
              {value.to}
            </Grid>
            <Grid item xs={2}>
              {this.renderBtCancel(1, value.txID)}
            </Grid>
          </Grid>

          <div>
            <Grid
              item
              xs={12}
              className={
                toggleHistory !== index ? style.toggleHistory : null
              }
            >
              <Grid item xs={12} className={style.itemDataHistorico}>
                <Grid item xs={12} className={style.descriptionHistory}>
                  <div>{i18n.t("LEASING_TITLE_EXPLORER")}</div>
                  <a href={blockexplorer + value.txID} target="blank">
                    {value.txID}
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    )));
  };

  loadModalLeasing = () => {
    let { openModal } = this.props;
    openModal();
  };

  render() {
    let { balance, leasingBalance } = this.props;
    return (
      <div>
        <Grid container className={style.containerTransactions}>
          <Grid container item xs={11} sm={10} md={10}>
            <Grid item xs={6} md={4}>
              <div className={style.boxCard}>
                {i18n.t("LEASING_BALANCE_LABEL")}
                <div className={style.strongText}>{balance}</div>
              </div>
            </Grid>
            <Grid item xs={6} md={4}>
              <div className={style.boxCard}>
                {i18n.t("LEASING_BALANCE_ACTIVE")}
                <div className={style.strongTextGreen}>{leasingBalance}</div>
              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              <button
                className={style.buttonEnable}
                onClick={() => this.loadModalLeasing()}
              >
                {i18n.t("LEASING_TITLE_NEW")}
              </button>
            </Grid>
          </Grid>
          <Grid item xs={11} sm={10} md={10}>
            <div className={style.contentTransactions}>
              <Grid container className={style.headerContent}>
                <Grid item xs={3}>
                  {i18n.t("LEASING")}
                </Grid>
                <Grid item xs={3}>
                  {i18n.t("LEASING_TITLE_AMOUNT")}
                </Grid>
                <Grid item xs={4}>
                  {i18n.t("LEASING_TITLE_NODE")}
                </Grid>
                <Grid item xs={2}>
                  {i18n.t("LEASING_TITLE_STATUS")}
                </Grid>
              </Grid>
              {this.renderHistory()}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

LeasingHistory.propTypes = {
  openModal: PropTypes.func,
  coins: PropTypes.array.isRequired,
  balance: PropTypes.number,
  history: PropTypes.object,
  setLeasingLoading: PropTypes.func,
  leasingBalance: PropTypes.number,
  cancelLeasing: PropTypes.func,
  coinFee: PropTypes.number,
  decimalPoint: PropTypes.number,
  user: PropTypes.object,
};

const mapStateToProps = store => (
  {
    coins: store.skeleton.coins,
    balance: store.skeleton.coins.lunes.balance.available,
    history: store.leasing.history.data,
    leasingBalance: store.leasing.balance,
    coinFee: store.leasing.coinFee.low,
    decimalPoint: store.skeleton.coins.lunes.decimalPoint,
    user: store.user.user
  }
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProfessionalNode,
      setLeasingLoading,
      cancelLeasing
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeasingHistory);