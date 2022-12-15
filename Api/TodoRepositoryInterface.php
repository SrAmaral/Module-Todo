<?php declare(strict_types=1);

namespace Webjump\Todo\Api;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Webjump\Todo\Api\Data\TodoInterface;

/**
 * Todo post CRUD interface.
 * @api
 * @since 1.0.0
 */
interface TodoRepositoryInterface
{
    /**
     * @param int $id
     * @return TodoInterface
     * @throws LocalizedException
     */
    public function getById(int $id): TodoInterface;

    /**
     * @param TodoInterface $todo
     * @return TodoInterface
     * @throws LocalizedException
     */
    public function save(TodoInterface $todo): TodoInterface;

    /**
     * @param int $id
     * @return bool
     * @throws NoSuchEntityException
     * @throws LocalizedException
     */
    public function deleteById(int $id): bool;

}
