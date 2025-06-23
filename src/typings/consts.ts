export type Sort =
    | 'name'
    | 'path'
    | 'created'
    | 'modified'
    | 'size'
    | '-name'
    | '-path'
    | '-created'
    | '-modified'
    | '-size';

export type MediaType =
    | 'audio'
    | 'backup'
    | 'book'
    | 'compressed'
    | 'data'
    | 'development'
    | 'diskimage'
    | 'document'
    | 'encoded'
    | 'executable'
    | 'flash'
    | 'font'
    | 'image'
    | 'settings'
    | 'spreadsheet'
    | 'text'
    | 'unknown'
    | 'video'
    | 'web';

export type ResourceType = 'dir' | 'file';

export type Scope =
    | 'cloud_api:disk.app_folder'
    | 'cloud_api:disk.read'
    | 'cloud_api:disk.write'
    | 'cloud_api:disk.info';

export type Method =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE';