import { NemetschekDocumentType } from '../models/NemetschekDocumentType';

export interface CreateDocument {
    name: string;
    description: string;
    type: number; // pdf, doc, csv
}