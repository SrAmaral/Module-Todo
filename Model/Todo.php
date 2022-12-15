<?php declare(strict_types=1);

namespace Webjump\Todo\Model;

use Magento\Framework\Model\AbstractModel;
use Webjump\Todo\Api\Data\TodoInterface;

class Todo extends AbstractModel implements TodoInterface {

    protected function _construct()
    {
        $this->_init(ResourceModel\Todo::class);
    }

    public function getTitle()
    {
        return $this->getData(self::TITLE);
    }

    public function setTitle($title)
    {
        return $this->setData(self::TITLE, $title);
    }

    public function getIsDone()
    {
        return $this->getData(self::IS_DONE);
    }

    public function setIsDone($isDone)
    {
        return $this->setData(self::IS_DONE, $isDone);
    }

    public function getCreatedAt()
    {
        return $this->getData(self::CREATED_AT);
    }
}
