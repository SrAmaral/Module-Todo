<?php declare(strict_types=1);

namespace Webjump\Todo\Api;

use Magento\Framework\App\Config\ScopeConfigInterface;

interface TodoConfigProviderInterface
{
    const TOTAL_DEFAULT_PATH = "todo_list/general/total_todos";

    const TOTAL_TODOS_PATH = "todo_list/general/total_options";

    function getTotalDefatultTodos (): int;

    function getOptionTodos (): array;

}
