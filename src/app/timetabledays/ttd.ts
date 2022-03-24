import {User} from "../users/user";
import {Project} from "../projects/project";

export class Ttd {
  workdayId: number;
  employee : User;
  date : Date;
  startTime: Date;
  endTime: Date;
  breakLength : number;
  expectedHours: number;
  absenceStatus: string;
  holidayHours: number;
  sickHours: number;
  project : Project;
  finalized : boolean;
}
