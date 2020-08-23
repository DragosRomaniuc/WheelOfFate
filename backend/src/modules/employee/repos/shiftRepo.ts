import { Employee } from '../domain/employee';
import { Shift } from '../domain/shift';

import { EmployeeMap } from '../mappers/EmployeeMap';
import { EmployeeId } from '../domain/employeeId';
import { ShiftId } from '../domain/shiftId';

import { Either } from '../../../core/logic/Result';
import { ShiftMap } from '../mappers/ShiftMap';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import mongoose from '../../../infra/database/setup';

export interface IShiftRepo {
  findShiftById(employeeId: EmployeeId): Promise<Shift>;
  findByIdAndUpdate(shiftId: ShiftId, update: object): Promise<Shift>;
  getShiftsBySecondLastShiftAscAndConsecutiveDayRule(): Promise<Shift[]>;
  exists(id: ShiftId): Promise<boolean>;
  create(shift: Shift): Promise<void>;
}

export class ShiftRepo implements IShiftRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  };

  public async findShiftById(employeeId: EmployeeId): Promise<Shift> {
    return this.models.Shift.findById(employeeId.id.toString());
  }

  public async findByIdAndUpdate(shiftId: ShiftId, update: object): Promise<Shift> {
    try {
      let id = shiftId.id.toValue();

      return this.models.Shift.findByIdAndUpdate(id, update, {useFindAndModify: true});
    } catch (err) {
      Promise.reject(err);
    }
  }

  public async exists(shiftId: ShiftId): Promise<boolean> {
    let id = shiftId.id.toValue();

    return !!await this.models.Shift.findById(id);;
  }

  public async getShiftsBySecondLastShiftAscAndConsecutiveDayRule(): Promise<Shift[]> {
    try {
      var yesterday = Date.now()- 1000*60*60*24;

      let shifts = await this.models.Shift
        .find({
          lastShiftEnd: { $lt : yesterday }
        })
        .sort({ secondLastShiftStart: 1, lastShiftStart: 1})
        // .sort({ lastShiftStart: 1 })
        // .limit(100)
        // .sort({ remainingShifts: 2 })
        .exec(); //Ascending

        console.log('din repo', shifts, 'din repo')
      // shifts = shifts.map((shift: Shift) => ShiftMap.toDomain(shift));

      return shifts;
    } catch (err) {
      Promise.reject(err);
    }
  }

  public async create(shift: Shift): Promise<void> {
    const ShiftModel = this.models.Shift;

    const rawShift = ShiftMap.toPersistence(shift);
    const exists = await this.exists(ShiftId.create(new UniqueEntityID(rawShift._id)));

    try {
      if (!exists) {
        console.log('[Shift Repo]: created: ', rawShift);
        let newShift = await new ShiftModel(rawShift);
        await newShift.save();
      }
    } catch (err) {
      console.log(err);
    }
  }
}