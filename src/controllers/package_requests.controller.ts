import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Package_request } from '@models/package_request';
import { Package_requestService } from '@services/package_requests.service';
import { StatusService } from '@services/status.service';
import { OkPacket } from 'mysql2';
import { Status } from '@models/status';
import { User } from '@/models/user';
import { CreatePackage_requestDto } from '@/dtos/package_requests.dto';
import { DeleteResult } from 'typeorm';

export class Package_requestController {
  public package_request = Container.get(Package_requestService);
  public status = Container.get(StatusService);

  public getPackage_requests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllPackage_requestsData: Package_request[] = await this.package_request.findAllPackage_request();

      res.status(200).json({ data: findAllPackage_requestsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPackage_requestById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const package_requestId = Number(req.params.id);
      const findOnePackage_requestData: Package_request = await this.package_request.findPackage_requestById(package_requestId);


      if(findOnePackage_requestData === null)
      {
        res.status(409).json({ data: "package request doesn't exist", message: 'findOne' });
        return;
      }


      res.status(200).json({ data: findOnePackage_requestData, message: 'findOne' });




    } catch (error) {
      next(error);
    }
  };

  public createPackage_request = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const package_requestData: Package_request = req.body;
      const dto: CreatePackage_requestDto = req.body;

      const defaultStatus:Status = await this.status.findStatusByName("in progress");


      if(defaultStatus === null)
      {
        res.status(409).json({ data: "Status 'in progress' doesn't exist", message: 'created' });
        return;
      }
      package_requestData.status = defaultStatus;
      package_requestData.user = new User();

      package_requestData.user.id = dto.id_user;

      const createPackage_requestData: Package_request = await this.package_request.createPackage_request(package_requestData);

      res.status(201).json({ data: createPackage_requestData, message: 'created' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public approvePackage_request = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const package_requestId = Number(req.params.id);
      const Package_requestData: Package_request = await this.package_request.findPackage_requestById(package_requestId);

      if(Package_requestData === null)
      {
        res.status(409).json({ data: "Package_request doesn't exist", message: 'approve' });
        return;
      }

      const statusData:Status = await this.status.findStatusById(Package_requestData.status.id);

      if (statusData.name_status === "approved")
      {

        res.status(409).json({ data: "already approved", message: 'approve' });
        return;
      }

      const approved:Status = await this.status.findStatusByName("approved");

      if(approved === null)
      {
        res.status(409).json({ data: "can't find status id for approved", message: 'approve' });
        return;
      }

      Package_requestData.status = approved;

      const updatePackage_requestData: Package_request = await this.package_request.updatePackage_request_status(Package_requestData);


      res.status(200).json({ data: updatePackage_requestData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public rejectPackageRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const package_requestId = Number(req.params.id);
      const Package_requestData: Package_request = await this.package_request.findPackage_requestById(package_requestId);

      if(Package_requestData === null)
      {
        res.status(409).json({ success: false, message: 'This package request does not exist.' });
      }

      const statusData:Status = await this.status.findStatusById(Package_requestData.status.id);

      if (statusData.name_status === "rejected")
      {

        res.status(409).json({ success: false, message: 'This package request has already been rejected.' });
        return;
      }

      const reject:Status = await this.status.findStatusByName("rejected");

      if(reject === null)
      {
        res.status(409).json({ success: false, message: 'Unable to find the status ID to reject this application.' });
        return;
      }
      Package_requestData.status = reject;
      const updatePackage_requestData: Package_request = await this.package_request.updatePackage_request_status(Package_requestData);



      res.status(200).json({ success: true, data: updatePackage_requestData, message: 'Package request has been successfully rejected.' });
    } catch (error) {
      next(error);
    }
  };

  public deletePackage_request = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const package_requestId = Number(req.params.id);
      const deletePackage_requestData: DeleteResult = await this.package_request.deletePackage_request(package_requestId);
      if(deletePackage_requestData.affected === 0)
      {

        res.status(409).json({ data: "Package_request doesn't exist", message: 'deleted' });
        return;
      }

      res.status(200).json({ data: deletePackage_requestData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
