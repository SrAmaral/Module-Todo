<?php declare(strict_types=1);

namespace Webjump\Todo\Model\Config;

use Magento\Framework\App\Config\ScopeConfigInterface;

class TodoConfigProvider implements \Webjump\Todo\Api\TodoConfigProviderInterface
{
    public function __construct(
        private ScopeConfigInterface $scopeConfig,
    ){}

    function getTotalDefatultTodos(): int
    {
        return  (int)$this->scopeConfig->getValue(self::TOTAL_DEFAULT_PATH);
    }

    function getOptionTodos(): array
    {
        return array_map('intval', explode("," ,$this->scopeConfig->getValue(self::TOTAL_TODOS_PATH)));
    }
}
