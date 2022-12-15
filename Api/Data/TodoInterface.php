<?php declare(strict_types=1);

namespace Webjump\Todo\Api\Data;

/**
 * Blog post interface.
 * @api
 * @since 1.0.0
 */
interface TodoInterface
{
    const ID = 'id';
    const TITLE = 'title';
    const IS_DONE = 'is_done';
    const CREATED_AT = 'created_at';

    /**
     * @return int
     */
    public function getId();

    /**
     * @param int $value
     * @return $this
     */
    public function setId($value);

    /**
     * @return string
     */
    public function getTitle();

    /**
     * @param string $title
     * @return $this
     */
    public function setTitle($title);

    /**
     * @return boolean
     */
    public function getIsDone();

    /**
     * @param boolean $isDone
     * @return $this
     */
    public function setIsDone($isDone);

    /**
     * @return string
     */
    public function getCreatedAt();
}
