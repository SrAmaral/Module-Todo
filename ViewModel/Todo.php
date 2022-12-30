<?php declare(strict_types=1);

namespace Webjump\Todo\ViewModel;

use Webjump\Todo\Api\Data\TodoInterface;
use Webjump\Todo\Api\TodoConfigProviderInterface;
use Webjump\Todo\Api\TodoRepositoryInterface;
use Webjump\Todo\Model\ResourceModel\Todo\Collection;
use Magento\Framework\View\Element\Block\ArgumentInterface;

class Todo implements ArgumentInterface
{
    public function __construct(
        private Collection $collection,
        private TodoRepositoryInterface $todoRepository,
        private TodoConfigProviderInterface $todoConfigProvider
    )
    {}

    public function getList(): array {
        return $this->collection->getItems();
    }

    public function getListData(): array {
        return $this->collection->getData();
    }

    public function getCount(): int {
        return $this->collection->count();
    }

    public function getDetail(int $id): TodoInterface {
        return $this->todoRepository->getById($id);
    }

    public function getTotalDefaultTodo() {
        return $this->todoConfigProvider->getTotalDefatultTodos();
    }

    public function getOptionTodos() {
        return $this->todoConfigProvider->getOptionTodos();
    }
}
