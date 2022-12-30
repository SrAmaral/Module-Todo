<?php declare(strict_types=1);

namespace Webjump\Todo\Model\Config\Source;

use Magento\Framework\Data\OptionSourceInterface;


class TotalTodoOptions implements OptionSourceInterface
{
    public function toOptionArray()
    {
        return [
            ['value' => '1', 'label' => __('1')],
            ['value' => '5', 'label' => __('5')],
            ['value' => '10', 'label' => __('10')],
            ['value' => '20', 'label' => __('20')],
            ['value' => '30', 'label' => __('30')],
            ['value' => '50', 'label' => __('50')],
            ['value' => '100', 'label' => __('100')],
        ];
    }
}
