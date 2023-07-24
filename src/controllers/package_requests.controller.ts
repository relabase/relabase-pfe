import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Package_request } from '@interfaces/package_requests.interface';
import { Package_requestService } from '@services/package_requests.service';
import { StatusService } from '@services/status.service';
import { OkPacket } from 'mysql2';
import { Status } from '@/interfaces/status.interface';

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
      if(findOnePackage_requestData === undefined)
      {
        
        res.status(409).json({ data: "Package_request doesn't exist", message: 'findOne' });
      }
      

      res.status(200).json({ data: findOnePackage_requestData, message: 'findOne' });




    } catch (error) {
      next(error);
    }
  };

  public createPackage_request = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const package_requestData: Package_request = req.body;
      package_requestData.id_status = 1;
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

      if(Package_requestData === undefined)
      {
        res.status(409).json({ data: "Package_request doesn't exist", message: 'approve' });
        return;
      }

      const statusData:Status = await this.status.findStatusById(Package_requestData.id_status);

      if (statusData.name_status === "approved")
      {
        
        res.status(409).json({ data: "already approved", message: 'approve' });
        return;
      }

      const approved:Status = await this.status.findStatusByName("approved");

      if(approved === undefined)
      {
        res.status(409).json({ data: "can't find status id for approved", message: 'approve' });
        return;
      }
      
      const updatePackage_requestData: OkPacket = await this.package_request.updatePackage_request_status(package_requestId,approved.id);


      res.status(200).json({ data: updatePackage_requestData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  
  public rejectPackageRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const package_requestId = Number(req.params.id);
      const Package_requestData: Package_request = await this.package_request.findPackage_requestById(package_requestId);

      if(Package_requestData === undefined)
      {
        res.status(409).json({ data: "Package_request doesn't exist", message: 'reject' });
      }

      const statusData:Status = await this.status.findStatusById(Package_requestData.id_status);

      if (statusData.name_status === "rejected")
      {
        
        res.status(409).json({ data: "already reject", message: 'reject' });
        return;
      }

      const reject:Status = await this.status.findStatusByName("rejected");

      if(reject === undefined)
      {
        res.status(409).json({ data: "can't find status id for rejected", message: 'reject' });
        return;
      }
      
      const updatePackage_requestData: OkPacket = await this.package_request.updatePackage_request_status(package_requestId,reject.id);



      res.status(200).json({ data: updatePackage_requestData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePackage_request = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const package_requestId = Number(req.params.id);
      const deletePackage_requestData: Package_request = await this.package_request.deletePackage_request(package_requestId);
      if(deletePackage_requestData === undefined)
      {
        
        res.status(409).json({ data: "Package_request doesn't exist", message: 'findOne' });
      }

      res.status(200).json({ data: deletePackage_requestData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
