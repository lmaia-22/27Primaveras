import { Injectable } from '@angular/core';
    
@Injectable()
export class PhotoService {
    getrestaurantPhotos() {
        {
            return [
                {
                    itemImageSrc: 'https://lmaia-22.github.io/27Primaveras/assets/menu',
                    thumbnailImageSrc: 'https://lmaia-22.github.io/27Primaveras/assets/menu',
                    alt: 'Menu',
                    title: 'Menu'
                },
                {
                    itemImageSrc: 'https://lmaia-22.github.io/27Primaveras/assets/food_1',
                    thumbnailImageSrc: 'https://lmaia-22.github.io/27Primaveras/assets/food_1',
                    alt: 'Posta Laminada',
                    title: 'Posta Laminada'
                },
                {
                    itemImageSrc: 'https://lmaia-22.github.io/27Primaveras/assets/food_2',
                    thumbnailImageSrc: 'https://lmaia-22.github.io/27Primaveras/assets/food_2',
                    alt: 'Tranche de pescada',
                    title: 'Tranche de pescada'
                },
                {
                    itemImageSrc: 'https://lmaia-22.github.io/27Primaveras/assets/food_3',
                    thumbnailImageSrc: 'https://lmaia-22.github.io/27Primaveras/assets/food_3',
                    alt: 'Risoto de Cogumelos',
                    title: 'Risoto de Cogumelos'
                },
                {
                    itemImageSrc: 'https://lmaia-22.github.io/27Primaveras/assets/food_4',
                    thumbnailImageSrc: 'https://lmaia-22.github.io/27Primaveras/assets/food_4',
                    alt: 'Medalhão de Alcatra',
                    title: 'Medalhão de Alcatra'
                },
                {
                    itemImageSrc: 'https://lmaia-22.github.io/27Primaveras/assets/food_5',
                    thumbnailImageSrc: 'https://lmaia-22.github.io/27Primaveras/assets/food_5',
                    alt: 'Massa da Gambas',
                    title: 'Massa da Gambas'
                }
            ];
        }
    }

    getRestaurantImages() {
        return Promise.resolve(this.getrestaurantPhotos());
      }

};