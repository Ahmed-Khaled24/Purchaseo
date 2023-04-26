import { dbConnection } from "../service/mysql";


export async function dbGetProductsByCateogry(cateogry: any): Promise<any> {
    // db call
    switch (cateogry) {
        case 'clothes':
            return ["clothes1", "clothes2"];
        case 'clothesMen':
            return ["clothesMen1", "clothesMen2"];
        case 'clothesWomen':
            return ["clothesWomen'1", "clothesWomen'2"];
        case 'clothesKids':
            return ["clothesKids1", "clothesKids2"];
        case 'homeAppkiance':
            return ["homeAppkiance1", "homeAppkiance2"];
        case 'electronics':
            return ["electronics1", "electronics2"];
        case 'electronicsPhones':
            return ["electronicsPhones1", "electronicsPhones2"];
        case 'electronicsComputers':
            return ["electronicsComputers1", "electronicsComputers2"];

    }
}

export async function dbGetProductsWithTypeTool(tool: any): Promise<any> {
    // db call
    return ['product1', 'product2'];
}