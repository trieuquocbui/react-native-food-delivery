import type CategoryModel from "./CategoryModel";

export default class ProductModel {
  _id!: string;
  name!: string;
  description!: string;
  quantity?: number;
  status!: boolean;
  featured!: boolean;
  price?: number;
  category!: string | CategoryModel;
  thumbnail!: string;
  sold?: number;
  appliedAt?: Date;
}
