import { Request, Response } from 'express';
import TrackingService from '../services/tracking.service';
import moment from 'moment-timezone';

class TrackingController {
  private trackingService: TrackingService;

  constructor() {
    this.trackingService = new TrackingService();
  }

  tracking = (req: Request, res: Response) => {
    const s_time: string = moment(req.query.stime as string)
      .tz('Asia/Seoul')
      .utc(true)
      .format('YYYY-MM-DD HH:mm:ss');
    const campaign: string = req.query.campaign as string;
    const count: number = Number(req.query.count);

    const url: string = this.trackingService.getTrackingCampaignUrl(campaign);
    const adid_list: Array<string> =
      this.trackingService.getTrackingAdid(count);

    this.trackingService.setTrackingRegister(s_time, adid_list, url);

    res
      .status(200)
      .send(moment().tz('Asia/Seoul').utc(true).format('YYYY-MM-DD HH:mm:ss'));
  };
}

export default TrackingController;
