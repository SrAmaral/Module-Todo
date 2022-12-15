<?php declare(strict_types=1);

namespace Webjump\Todo\Controller\Index;

use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\Controller\Result\Forward;
use Magento\Framework\Controller\Result\ForwardFactory;

class Index implements HttpGetActionInterface
{
    private ForwardFactory $forwardFactory;

    public function __construct(
        ForwardFactory $forwardFactory
    )
    {
        $this->forwardFactory = $forwardFactory;
    }

    public function execute()
    {
        /** @var Forward $forward */
        $forward = $this->forwardFactory->create();
        return $forward->setController('todos')->forward('list');
    }
}
