export const openChat = iduser => ({
  type: "OPEN_CHAT_P2P",
  iduser
});


export const closeChat = () => ({
  type: "CLOSE_CHAT_P2P"
});

export const setModalStep = step => ({
  type: "SET_MODAL_BUY_STEP",
  step
});

export const openModal = open => ({
  type: "SET_MODAL_OPEN",
  open
});