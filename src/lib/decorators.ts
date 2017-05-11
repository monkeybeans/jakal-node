import config from '../config/application-properties.json';

//function property(target: string /*, propertyKey: string, descriptor: PropertyDescriptor */): any {
function property(target: string): any {
    console.log('@property: ');

    return 4;
}

export {
    property,
};
