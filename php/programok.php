<?php
declare(strict_types=1);

// Using namespaces aliasing
use Util\Util as Util;
use Database\Database as Database;

// Set environment
require_once('../../common/php/environment.php');

// Connect to database
$db = new Database();

// Get current date time
$currDateTime = date('Y-m-d H:i:s');

// Set query
$query ="SELECT `name`, 
								`img`, 
								`expiration`,
								`description` 
					 FROM `programok`
				  WHERE `expiration` > ?
			 ORDER BY `expiration`;";

// Execute query
$result['future'] = $db->execute($query, array($currDateTime));

// Set query
$query ="SELECT `name`, 
								`img`, 
								`expiration`,
								`description` 
					 FROM `programok`
				  WHERE `expiration` <= ?
			 ORDER BY `expiration`;";

// Execute query
$result['past'] = $db->execute($query, array($currDateTime));

// Close connection
$db = null;

// Set response
Util::setResponse($result);