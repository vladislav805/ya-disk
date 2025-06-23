/**
 * @see https://yandex.ru/dev/disk/api/reference/response-objects.html#operation
 */
export interface Operation {
    /**
     * Статус операции. Возможные значения:
     * - success — операция успешно завершена.
     * - failed — операцию совершить не удалось, попробуйте повторить изначальный запрос копирования, перемещения или удаления.
     * - in-progress — операция начата, но еще не завершена.
     */
    status: OperationStatus;
}

export type OperationStatus = 'success' | 'failed' | 'in-progress';
