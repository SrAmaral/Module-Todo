<?php declare(strict_types=1);

namespace Webjump\Todo\Model;

use Magento\Framework\Exception\CouldNotDeleteException;
use Magento\Framework\Exception\CouldNotSaveException;
use Magento\Framework\Exception\NoSuchEntityException;
use Webjump\Todo\Api\Data\TodoInterface;
use Webjump\Todo\Model\ResourceModel\Todo as TodoResourceModel;
use Webjump\Todo\Model\ResourceModel\Todo\Collection;
use Webjump\Todo\Api\TodoRepositoryInterface;

class TodoRepository implements TodoRepositoryInterface
{

    public function __construct(
        private TodoFactory $todoFactory,
        private TodoResourceModel $todoResourceModel,
        private Collection $collection
    ) {}

    /**
     * @param int $id
     * @return TodoInterface
     * @throws NoSuchEntityException
     */
    public function getById(int $id): TodoInterface
    {
        $todo = $this->todoFactory->create();
        $this->todoResourceModel->load($todo, $id);

        if (!$todo->getId()) {
            throw new NoSuchEntityException(__('The todo item with the "%1" ID doesn\'t exist.', $id));
        }

        return $todo;
    }

    /**
     * @return TodoInterface[] | null
     */
    public function getList()
    {
        $todos = $this->collection->getItems();

        return $todos;
    }

    /**
     * @param TodoInterface $todo
     * @return TodoInterface
     * @throws CouldNotSaveException
     */
    public function save(TodoInterface $todo): TodoInterface
    {
        try {
            $this->todoResourceModel->save($todo);
        } catch (\Exception $exception) {
            throw new CouldNotSaveException(__($exception->getMessage()));
        }

        return $todo;
    }

    /**
     * @param int $id
     * @return bool
     * @throws CouldNotDeleteException
     * @throws NoSuchEntityException
     */
    public function deleteById(int $id): bool
    {
        $todo = $this->getById($id);

        try {
            $this->todoResourceModel->delete($todo);
        } catch (\Exception $exception) {
            throw new CouldNotDeleteException(__($exception->getMessage()));
        }

        return true;
    }
}
