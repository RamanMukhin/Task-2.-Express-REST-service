import { StatusCodes } from 'http-status-codes';
import * as boardsRepo from './board.memory.repository.js';
import { toBoard, toColumn, toUpdateBoard } from '../../common/boardUtil.js';
import { removeTasksWithBoard } from '../tasks/task.service.js';
import { NotFoundError } from '../../middlewares/errorHandler.js';
const getAll = async () => await boardsRepo.getAll();
const create = async (title, columns) => {
    const columnsCreateFrom = await toColumn(columns);
    const board = await toBoard(title, columnsCreateFrom);
    return await boardsRepo.save(board);
};
const find = async (id) => {
    const board = await boardsRepo.find(id);
    if (!board)
        throw new NotFoundError(StatusCodes.NOT_FOUND, 'Board not found');
    return board;
};
const update = async (id, titleUpdateFrom, columnsUpdateFrom) => {
    const boardToUpdate = await find(id);
    const boardUpdateFrom = await toUpdateBoard(boardToUpdate, titleUpdateFrom, columnsUpdateFrom);
    return await boardsRepo.update(id, boardUpdateFrom);
};
const remove = async (id) => {
    await find(id);
    await boardsRepo.remove(id);
    await removeTasksWithBoard(id);
};
export { getAll, create, find, update, remove };
