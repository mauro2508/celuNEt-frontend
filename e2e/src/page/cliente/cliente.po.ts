import { element, by } from "protractor";

export class ClientePage{
    private buttonCrearCliente = element(by.id('buttonCrearCliente'));
    private inputNombre = element(by.id('nombre'));
    private inputApellido = element(by.id('apellido'));
    private inputEmail = element(by.id('email'));
    private inputFechaNacimiento = element(by.id('fechaNacimiento'));
    private buttonCrearClienteForm = element(by.id('buttoncrearClienteForm'));

    private listaClientes = element.all(by.css('tbody.listaClientes tr'));

    async clickBotonCrearCliente(){
        await this.buttonCrearCliente.click();
    }

    async clickBotonCrearClienteForm(){
        await this.buttonCrearClienteForm.click();
    }

    async ingresarNombre(nombre){
        await this.inputNombre.sendKeys(nombre);
    }

    async ingresarApellido(apellido){
        await this.inputApellido.sendKeys(apellido);
    }

    async ingresarEmail(email){
        await this.inputEmail.sendKeys(email);
    }

    async ingresarFechaNacimiento(fechaNacimiento){
        await this.inputFechaNacimiento.sendKeys(fechaNacimiento);
    }

    async contarClientes(){
        return this.listaClientes.count();
    }



}