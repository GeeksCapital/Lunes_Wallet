import React from "react";
import PropTypes from "prop-types";
// STYLE
import style from "../style.css";


class InforModal extends React.Component {
    render() {
        return (
            <div className={style.modalBox}>
                <img
                    src={"/images/icons/confirm/confirm.png"}
                    className={style.iconInfor}
                />
                <div className={style.totalConfirm}>
                    <span>{"Você acabou de debitar um boleto"}</span>
                    <span>
                        {"no valor de R$ 30,00 em sua Wallet Lunes"}
                    </span>
                </div>                

                <div className={style.confirmFee}>
                    <div>
                        {"Você pode visualizar a transação em sua aba “Históricos” desse boleto."}
                    </div>
                </div>

            </div>
        );
    }
}
InforModal.propTypes = {}
export default InforModal;