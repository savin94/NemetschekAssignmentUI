import { NemetschekDocumentType } from '../models/NemetschekDocumentType';

export interface Document {
    id: string;
    name: string;
    description: string;
    type: number; // pdf, doc, csv
}