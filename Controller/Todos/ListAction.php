<?php declare(strict_types=1);

namespace Webjump\Todo\Controller\Todos;


use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\View\Result\Page;
use Magento\Framework\View\Result\PageFactory;

class ListAction implements HttpGetActionInterface
{

    private PageFactory $pageFactory;

    public function __construct(
        PageFactory $pageFactory
    ){
        $this->pageFactory = $pageFactory;
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
