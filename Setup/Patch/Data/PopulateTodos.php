<?php declare(strict_types=1);

namespace Webjump\Todo\Setup\Patch\Data;

use Webjump\Todo\Api\TodoRepositoryInterface;
use Webjump\Todo\Model\TodoFactory;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Framework\Setup\Patch\PatchInterface;

class PopulateTodos implements DataPatchInterface
{
    public function __construct(
        private ModuleDataSetupInterface $moduleDataSetup,
        private TodoFactory $todoFactory,
        private TodoRepositoryInterface $todoRepository,
    ) {}

    public static function getDependencies(): array
    {
        return [];
    }

    public function getAliases(): array
    {
        return [];
    }

    public function apply()
    {
        $this->moduleDataSetup->startSetup();

        $todo = $this->todoFactory->create();
        $todo->setData([
            'title' => 'An awesome todo',
            'is_done' => false,
        ]);
        $this->todoRepository->save($todo);

        $this->moduleDataSetup->endSetup();
    }
}
