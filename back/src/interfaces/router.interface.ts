import { Response } from 'express';
import { Request } from 'express';
import { Router } from 'express';

export interface IRouter{
  list:(Request, Response) => void;
  select:(Request, Response) => void;
  create:(Request, Response) => void;
  update:(Request, Response) => void;
  remove:(Request, Response) => void;
  routes:()=>void;
  router:Router;
}