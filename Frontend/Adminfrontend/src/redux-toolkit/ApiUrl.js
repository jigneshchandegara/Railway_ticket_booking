//BASE_URL
export let BASE_URL = "http://localhost:8080/Api";

//Station
export let Station_POST = "/Station/createstation"
export let Station_GET_ID = "/Station/stationbyid/:id"
export let Station_GET = "/Station/stationget"
export let Station_DELETE = "/Station/stationdelete/"
export let Station_UPDATA = "/Station/stationupdata/"


// Train Type
export let TRAIN_TYPE_POST = "/Traintype/createtraintype"
export let TRAIN_TYPE_GET_ID = "/Traintype/traintypebyid/:id"
export let TRAIN_TYPE_GET = "/Traintype/gettraintype"
export let TRAIN_TYPE_DELETE = "/Traintype/deletetraintype/"
export let TRAIN_TYPE_UPDATA = "/Traintype/updatatraintype/"


// Class
export let CLASS_POST = "/Class/create_class"
export let CLASS_GET = "/Class/classlistget"
export let CLASS_DELETE = "/Class/classdelete/"
export let CLASS_UPDATA = "/Class/classupdata/"

//TRAINSCHEDULE
export let TRAIN_SCHEDULE_POST = "/TrainSchedule/createtrainschedule"
export let TRAIN_SCHEDULE_GET = "/TrainSchedule/gettrainschedulelist"
export let TRAIN_SCHEDULE_DELETE = "/TrainSchedule/deletetrainschedule/"
export let TRAIN_SCHEDULE_UPDATA = "/TrainSchedule/updatascheduletrain/"
