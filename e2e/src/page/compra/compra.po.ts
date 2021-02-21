import { element, by } from "protractor";

export class CompraPage{
    private inputDescripcion = element(by.id('descripcion'));

    private matSelectProducto = element(by.tagName('mat-select'));

    private matOptionProducto = element(by.cssContainingText('mat-option .mat-option-text', 'Xiaomi redmi note 8'));

    private buttonCrearCompraForm = element(by.id('crearCompraForm'));

    async ingresarDescripcion(descripcion){
        await this.inputDescripcion.sendKeys(descripcion);
    }

    async clickMatSelectProducto(){
        await this.matSelectProducto.click();
    }

    async clickMatOptionProducto(){
        await this.matOptionProducto.click();
    }

    async clickButtonCrearCompraForm(){
        await this.buttonCrearCompraForm.click();
    }
}