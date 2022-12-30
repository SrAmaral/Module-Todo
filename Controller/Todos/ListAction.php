<?php declare(strict_types=1);

namespace Webjump\Todo\Controller\Todos;


use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\View\Result\Page;
use Magento\Framework\View\Result\PageFactory;
use Webjump\Todo\Api\TodoConfigProviderInterface;

class ListAction implements HttpGetActionInterface
{

    private PageFactory $pageFactory;
    private TodoConfigProviderInterface $todoConfigProvider;

    public function __construct(
        PageFactory $pageFactory,
        TodoConfigProviderInterface $todoConfigProvider
    ){
        $this->pageFactory = $pageFactory;
        $this->todoConfigProvider = $todoConfigProvider;
    }

    /**
     * @return Page
     */
    public function execute(): Page
    {
        $resultPage = $this->getResultPageFactory()->create();
        $resultPage->getConfig()->getTitle()->prepend(__('Todo List'));

        return $this->pageFactory->create();
    }

    public function getResultPageFactory()
    {
        return $this->pageFactory;
    }
}
