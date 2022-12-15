<?php declare(strict_types=1);

namespace Webjump\Todo\Model\ResourceModel\Todo;

use Webjump\Todo\Model\ResourceModel\Todo;
use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

class Collection extends AbstractCollection
{
    protected function _construct()
    {
        $this->_init(\Webjump\Todo\Model\Todo::class, Todo::class);
    }
}

