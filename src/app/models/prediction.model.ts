export interface Prediction {
    uuid: string;
    idUserPrediction: string;
    idFlightPrediction: string;
    datePrediction: Date;
    exitHomeTimePrediction: string;
    transportTimePrediction: string;
    entranceTimePrediction: string;
    checkInTimePrediction: string;
    securityTimePrediction: string;
    passportTimePrediction: string;
    gateTimePrediction: string;
    planeTimePrediction: string;
    deletedPrediction: boolean;
    createdAt: string;
    updatedAt: string;
}