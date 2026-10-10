export type TemplateValues = Record<string, string | number | boolean>;


export function buildRequestBody<T>(template: T, values: TemplateValues): T
{
    return JSON.parse(JSON.stringify(template), (_key, value) =>
        typeof value === 'string' && value.startsWith('{{') ? values[value.slice(2, -2)] : value);
}
