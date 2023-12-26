import { marketRepository } from "../../repositories/index.js";
import { SetSpreadAlert } from "./SetSpreadAlert.js";
import { SetSpreadAlertController } from "./SetSpreadAlertController.js";

const setSpreadAlert = new SetSpreadAlert(marketRepository);
const setSpreadAlertController = new SetSpreadAlertController(setSpreadAlert);

export { setSpreadAlert, setSpreadAlertController };