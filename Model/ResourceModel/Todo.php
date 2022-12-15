<?php declare(strict_types=1);

namespace Webjump\Todo\Model\ResourceModel;

use Magento\Framework\Model\ResourceModel\Db\AbstractDb;

class Todo extends AbstractDb
{
    const MAIN_TABLE = 'webjump_todos';
    const ID_FIELD_NAME = 'id';

    protected function _construct()
    {
        $this->_init(self::MAIN_TABLE, self::ID_FIELD_NAME);
    }
}
