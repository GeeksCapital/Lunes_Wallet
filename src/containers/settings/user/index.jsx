import React from 'react';
import PropTypes from 'prop-types';
import i18n from "../../../utils/i18n";

// import Select from "../../../components/select";
import { Grid, Avatar, Input, Select, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Done, Close, ExpandMore } from "@material-ui/icons";
import style from "../style.css";
import colors from "../../../components/bases/colors";

const customStyle = {
  img: {
    width: '60%',
    height: 'auto',
  },
  inputRoot: {
    color: colors.messages.info,
    marginBottom: "1rem",
    padding: '5px',
    width: 'calc(100% - 20px)',
    "&:hover:before": {
      borderBottomColor: colors.purple.dark,
    },
  },
  inputCss: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "14px",
  },
  inputCssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark,
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`,
    },
  },
  selectRoot: {
    color: colors.messages.info,
    '&:before': {
      marginBottom: '1rem'
    },
    "&:before, &:after": {
      borderColor: colors.purple.dark,
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderColor: `${colors.purple.dark} !important`,
    },
  },
  disabled: {},
  error: {},
  focused: {},
}

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        verified: undefined,
        birthdate: {
          day: 1,
          month: 1,
          year: 1990
        },

      }
    }
  }

  changeAvatar = () => {
    alert('Avatar changed!');
  }

  renderSelectItems = (init = 0) => {
    return [...Array(4).keys()].map(item => <MenuItem key={item} value={init + item}>{init + item}</MenuItem>);
  }

  handleBirthdateChange = name => event => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        birthdate: {
          ...this.state.user.birthdate,
          [name]: event.target.value
        }
      }
    })
  }

  render() {
    const {classes} = this.props;
    const {user} = this.state;

    return (
      <div className={style.userContainer}>
        <Grid container>
          <Grid item xs={12} sm={4}>
            {/* AVATAR */}
            <Grid item xs={12} className={style.userRow}>
              <div className={style.userAvatarAlign}>
                <Avatar src="http://www.achieveaim.com/media/images/user/4.jpg"
                  alt={i18n.t("SETTINGS_USER_IMAGE")}
                  className={style.userAvatar}
                />
              </div>
              <div className={style.userAvatarAlign}>
                <Avatar classes={{ img: classes.img }}
                  src="/images/icons/camera/camera@2x.png"
                  alt={i18n.t("SETTINGS_USER_IMAGE")}
                  className={style.userBtnAvatar}
                  onClick={() => this.changeAvatar()}
                />
              </div>
            </Grid>

            {/* STATUS */}
            <Grid item xs={12} className={style.userRow}>
              <div className={style.userContent}>
                <p className={style.userWhiteTitle}>
                  {`${i18n.t("SETTINGS_USER_STATUS")}: `}
                  <span className={user.userVerified ? style.userSuccessStatus : style.userErrorStatus}>
                    {user.verified ? i18n.t("SETTINGS_USER_ACCOUNT_VERIFIED") : i18n.t("SETTINGS_USER_ACCOUNT_NOT_VERIFIED")}
                  </span>
                </p>
                <p className={style.userTextDefault} style={{margin: '1rem 0 0 0'}}>
                  {user.verified ? <Done className={style.userSuccessDefault} /> : <Close className={style.userErrorDefault} />}
                  <span className={style.userStatusItem}>{i18n.t("SETTINGS_USER_EMAIL_VERIFIED")}</span>
                </p>
                <p className={style.userTextDefault} style={{marginTop: '0'}}>
                  {user.verified ? <Done className={style.userSuccessDefault} /> : <Close className={style.userErrorDefault} />}
                  <span className={style.userStatusItem}>{i18n.t("SETTINGS_USER_2FA_VERIFIED")}</span>
                </p>
              </div>
            </Grid>

            {/* PASSWORD */}
            <Grid item xs={12} className={style.userRow}>
              <div className={style.userContent}>
                <p className={style.userWhiteTitle}>{i18n.t("SETTINGS_USER_PASSWORD")}</p>
                <Input
                  classes={{
                    root: classes.inputRoot,
                    underline: classes.inputCssUnderline,
                    input: classes.inputCss
                  }}
                  type="password"
                  placeholder={i18n.t("SETTINGS_USER_CURRENT_PASSWORD")}
                  inputProps={{required: false}}
                />
                <Input
                  classes={{
                    root: classes.inputRoot,
                    underline: classes.inputCssUnderline,
                    input: classes.inputCss
                  }}
                  type="password"
                  placeholder={i18n.t("SETTINGS_USER_NEW_PASSWORD")}
                  inputProps={{required: false}}
                />
                <Input
                  classes={{
                    root: classes.inputRoot,
                    underline: classes.inputCssUnderline,
                    input: classes.inputCss
                  }}
                  type="password"
                  placeholder={i18n.t("SETTINGS_USER_NEW_PASSWORD")}
                  inputProps={{required: false}}
                />
              </div>

              <div>
                <button
                  className={style.userButtonEnable}
                  onClick={() => alert('Password changed!')}
                >
                  {i18n.t("SETTINGS_USER_CHANGE_PASSWORD")}
                </button>
              </div>
            </Grid>
          </Grid>

          {/* USER INFO */}
          <Grid item xs={12} sm={8}>
            <Grid item xs={12} className={style.userRow}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <div className={style.userContent}>
                    <p className={style.userTextDefault}>{i18n.t("SETTINGS_USER_FIRST_NAME")}</p>
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                      inputProps={{required: false}}
                    />
                  </div>

                  <div className={style.userContent}>
                    <p className={style.userTextDefault}>Birthdate</p>
                    <Grid container>
                      <Grid item xs={4}>
                        <label className={style.userSelectLabel}>{i18n.t("SETTINGS_USER_DAY")}</label>
                        <Select
                          value={user.birthdate.day}
                          onChange={this.handleBirthdateChange('day')}
                          classes={{
                            root: classes.selectRoot,
                          }}
                        >
                          <MenuItem value="">
                            <em>{i18n.t("SETTINGS_USER_SELECT")}</em>
                          </MenuItem>
                          { this.renderSelectItems() }
                        </Select>
                      </Grid>
                      <Grid item xs={4}>
                        <label className={style.userSelectLabel}>{i18n.t("SETTINGS_USER_MONTH")}</label>
                        <Select
                          value={user.birthdate.month}
                           onChange={this.handleBirthdateChange('month')}
                          classes={{
                            root: classes.selectRoot,
                          }}
                        >
                          <MenuItem value="">
                            <em>{i18n.t("SETTINGS_USER_SELECT")}</em>
                          </MenuItem>
                          { this.renderSelectItems() }
                        </Select>
                      </Grid>
                      <Grid item xs={4}>
                        <label className={style.userSelectLabel}>{i18n.t("SETTINGS_USER_YEAR")}</label>
                        <Select
                          value={user.birthdate.year}
                           onChange={this.handleBirthdateChange('year')}
                          classes={{
                            root: classes.selectRoot,
                          }}
                        >
                          <MenuItem value="">
                            <em>{i18n.t("SETTINGS_USER_SELECT")}</em>
                          </MenuItem>
                          { this.renderSelectItems(1990) }
                        </Select>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <div className={style.userContent}>
                    <p className={style.userTextDefault}>{i18n.t("SETTINGS_USER_SURNAME")}</p>
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>

            {/* ADDRESS */}
            <Grid item xs={12} className={style.userRow}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <div className={style.userContent}>
                    <p className={style.userTextDefault}>{i18n.t("SETTINGS_USER_ADDRESS")}</p>
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                      inputProps={{required: false}}
                    />
                  </div>

                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={style.userContent}>
                    <p className={style.userTextDefault}>{i18n.t("SETTINGS_USER_ZIP_CODE")}</p>
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={style.userButtonContainer}>
              <button
                className={style.userButtonEnable}
                onClick={() => alert('Data stored!')}
              >
                {i18n.t("SETTINGS_USER_SAVE_DATA")}
              </button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(customStyle)(User);
